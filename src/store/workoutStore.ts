import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Workout, WorkoutExercise, Set as WorkoutSet, Exercise } from '../types/workout';

interface WorkoutGoals {
  weeklyWorkouts: number;
  monthlyWorkouts: number;
  hasSetInitialGoals: boolean;
}

interface WorkoutStore {
  currentWorkout: Workout | null;
  workoutHistory: Workout[];
  goals: WorkoutGoals;
  startNewWorkout: (name: string) => void;
  addExerciseToWorkout: (exercise: Exercise) => void;
  updateSet: (exerciseIndex: number, setIndex: number, setData: Partial<WorkoutSet>) => void;
  completeWorkout: () => void;
  cancelWorkout: () => void;
  updateGoals: (newGoals: Partial<WorkoutGoals>) => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  currentWorkout: null,
  workoutHistory: [],
  goals: {
    weeklyWorkouts: 0,
    monthlyWorkouts: 0,
    hasSetInitialGoals: false,
  },

  startNewWorkout: (name) => {
    const newWorkout: Workout = {
      id: uuidv4(),
      name,
      exercises: [],
      date: new Date().toISOString(),
      status: 'in-progress',
    };
    set({ currentWorkout: newWorkout });
  },

  addExerciseToWorkout: (exercise) => {
    set((state) => {
      if (!state.currentWorkout) return state;

      const newExercise: WorkoutExercise = {
        ...exercise,
        sets: [
          {
            id: uuidv4(),
            completed: false,
          },
        ],
      };

      return {
        currentWorkout: {
          ...state.currentWorkout,
          exercises: [...state.currentWorkout.exercises, newExercise],
        },
      };
    });
  },

  updateSet: (exerciseIndex, setIndex, setData) => {
    set((state) => {
      if (!state.currentWorkout) return state;

      const newExercises = [...state.currentWorkout.exercises];
      const exercise = newExercises[exerciseIndex];
      if (!exercise) return state;

      let newSets = [...exercise.sets];
      
      // If setIndex is beyond current length, we're adding a new set
      if (setIndex >= newSets.length) {
        newSets = [...newSets, { id: uuidv4(), completed: false, ...setData }];
      } else {
        newSets[setIndex] = { ...newSets[setIndex], ...setData };
      }

      newExercises[exerciseIndex] = {
        ...exercise,
        sets: newSets,
      };

      return {
        currentWorkout: {
          ...state.currentWorkout,
          exercises: newExercises,
        },
      };
    });
  },

  completeWorkout: () => {
    set((state) => {
      if (!state.currentWorkout) return state;

      const completedWorkout = {
        ...state.currentWorkout,
        status: 'completed' as const,
        duration: Math.round(
          (new Date().getTime() - new Date(state.currentWorkout.date).getTime()) / 60000
        ),
      };

      // Calculate weekly and monthly workout counts
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      monthStart.setHours(0, 0, 0, 0);

      // Get all completed workouts including the current one
      const allWorkouts = [...state.workoutHistory, completedWorkout];

      // Count completed workouts from this week
      const weeklyWorkouts = allWorkouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workout.status === 'completed' && workoutDate >= weekStart;
      }).length;

      // Count completed workouts from this month
      const monthlyWorkouts = allWorkouts.filter(workout => {
        const workoutDate = new Date(workout.date);
        return workout.status === 'completed' && workoutDate >= monthStart;
      }).length;

      return {
        currentWorkout: null,
        workoutHistory: allWorkouts,
        goals: {
          ...state.goals,
          weeklyWorkouts,
          monthlyWorkouts,
        }
      };
    });
  },

  cancelWorkout: () => {
    set({ currentWorkout: null });
  },

  updateGoals: (newGoals) => {
    set((state) => ({
      goals: {
        ...state.goals,
        ...newGoals,
        hasSetInitialGoals: true,
      },
    }));
  },
})); 