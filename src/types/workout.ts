export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'flexibility';
  muscleGroups?: string[];
  description?: string;
  equipment?: string[];
}

export interface Set {
  id: string;
  weight?: number;
  reps?: number;
  duration?: number; // in seconds
  distance?: number; // in meters
  completed: boolean;
}

export interface WorkoutExercise extends Exercise {
  sets: Set[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  date: string;
  duration?: number; // in minutes
  status: 'planned' | 'in-progress' | 'completed';
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  exercises: {
    exerciseId: string;
    defaultSets: number;
    defaultReps?: number;
    defaultWeight?: number;
  }[];
}

export interface WorkoutProgress {
  id: string;
  userId: string;
  workoutId: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: Set[];
  }[];
  totalVolume?: number; // total weight lifted
  duration: number; // in minutes
  caloriesBurned?: number;
} 