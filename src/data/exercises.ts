import { Exercise } from '../types/workout';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create exercise variations
const createVariation = (
  baseExercise: Exercise,
  variation: {
    name: string;
    description: string;
    muscleGroups?: string[];
    equipment?: string[];
  }
): Exercise => ({
  id: uuidv4(),
  parentId: baseExercise.id,
  name: variation.name,
  category: baseExercise.category,
  muscleGroups: variation.muscleGroups || baseExercise.muscleGroups,
  equipment: [...(baseExercise.equipment || []), ...(variation.equipment || [])],
  description: variation.description,
});

export const exercises: Exercise[] = [
  // Bench Press Family
  {
    id: uuidv4(),
    name: 'Bench Press',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    equipment: ['bench'],
    description: 'Fundamental chest pressing movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Barbell Flat Bench Press',
        category: 'strength',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        equipment: ['barbell'],
        description: 'Classic flat bench press with barbell',
      },
      {
        id: uuidv4(),
        name: 'Barbell Incline Bench Press',
        category: 'strength',
        muscleGroups: ['upper chest', 'shoulders', 'triceps'],
        equipment: ['barbell', 'incline bench'],
        description: 'Incline press targeting upper chest',
      },
      {
        id: uuidv4(),
        name: 'Barbell Decline Bench Press',
        category: 'strength',
        muscleGroups: ['lower chest', 'shoulders', 'triceps'],
        equipment: ['barbell', 'decline bench'],
        description: 'Decline press targeting lower chest',
      },
      {
        id: uuidv4(),
        name: 'Dumbbell Flat Bench Press',
        category: 'strength',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        equipment: ['dumbbells'],
        description: 'Flat press with dumbbells for greater range of motion',
      },
      {
        id: uuidv4(),
        name: 'Dumbbell Incline Bench Press',
        category: 'strength',
        muscleGroups: ['upper chest', 'shoulders', 'triceps'],
        equipment: ['dumbbells', 'incline bench'],
        description: 'Incline press with dumbbells',
      },
      {
        id: uuidv4(),
        name: 'Close-Grip Bench Press',
        category: 'strength',
        muscleGroups: ['chest', 'triceps'],
        equipment: ['barbell'],
        description: 'Narrow grip press emphasizing triceps',
      }
    ]
  },

  // Deadlift Family
  {
    id: uuidv4(),
    name: 'Deadlift',
    category: 'strength',
    muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
    equipment: ['barbell'],
    description: 'Fundamental hip-hinge movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Conventional Deadlift',
        category: 'strength',
        muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
        description: 'Traditional deadlift stance',
      },
      {
        id: uuidv4(),
        name: 'Sumo Deadlift',
        category: 'strength',
        muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
        description: 'Wide stance deadlift variation',
      },
      {
        id: uuidv4(),
        name: 'Romanian Deadlift',
        category: 'strength',
        muscleGroups: ['back', 'hamstrings', 'glutes'],
        description: 'Stiff-legged variation focusing on hamstrings',
      },
      {
        id: uuidv4(),
        name: 'Single-Leg Romanian Deadlift',
        category: 'strength',
        muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
        equipment: ['dumbbell'],
        description: 'Unilateral Romanian deadlift for balance and stability',
      },
      {
        id: uuidv4(),
        name: 'Trap Bar Deadlift',
        category: 'strength',
        muscleGroups: ['back', 'hamstrings', 'glutes', 'core'],
        equipment: ['trap bar'],
        description: 'Deadlift using hexagonal bar',
      }
    ]
  },

  // Squat Family
  {
    id: uuidv4(),
    name: 'Squat',
    category: 'strength',
    muscleGroups: ['quadriceps', 'hamstrings', 'glutes', 'core'],
    description: 'Fundamental lower body movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Back Squat',
        category: 'strength',
        muscleGroups: ['quadriceps', 'hamstrings', 'glutes', 'core'],
        equipment: ['barbell', 'squat rack'],
        description: 'Traditional barbell back squat',
      },
      {
        id: uuidv4(),
        name: 'Front Squat',
        category: 'strength',
        muscleGroups: ['quadriceps', 'core'],
        equipment: ['barbell', 'squat rack'],
        description: 'Barbell squat with front rack position',
      },
      {
        id: uuidv4(),
        name: 'Bulgarian Split Squat',
        category: 'strength',
        muscleGroups: ['quadriceps', 'hamstrings', 'glutes'],
        equipment: ['dumbbells', 'bench'],
        description: 'Unilateral squat with rear foot elevated',
      },
      {
        id: uuidv4(),
        name: 'Goblet Squat',
        category: 'strength',
        muscleGroups: ['quadriceps', 'hamstrings', 'glutes', 'core'],
        equipment: ['dumbbell', 'kettlebell'],
        description: 'Squat holding weight at chest',
      },
      {
        id: uuidv4(),
        name: 'Overhead Squat',
        category: 'strength',
        muscleGroups: ['quadriceps', 'hamstrings', 'glutes', 'shoulders', 'core'],
        equipment: ['barbell'],
        description: 'Squat while holding weight overhead',
      }
    ]
  },

  // Pull-up Family
  {
    id: uuidv4(),
    name: 'Pull-up',
    category: 'strength',
    muscleGroups: ['back', 'biceps', 'shoulders'],
    equipment: ['pull-up bar'],
    description: 'Vertical pulling movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Wide-Grip Pull-up',
        category: 'strength',
        muscleGroups: ['back', 'biceps', 'shoulders'],
        equipment: ['pull-up bar'],
        description: 'Pull-up with wide hand placement',
      },
      {
        id: uuidv4(),
        name: 'Chin-up',
        category: 'strength',
        muscleGroups: ['back', 'biceps', 'shoulders'],
        equipment: ['pull-up bar'],
        description: 'Pull-up with underhand grip',
      },
      {
        id: uuidv4(),
        name: 'Neutral-Grip Pull-up',
        category: 'strength',
        muscleGroups: ['back', 'biceps', 'shoulders'],
        equipment: ['pull-up bar'],
        description: 'Pull-up with parallel grip',
      },
      {
        id: uuidv4(),
        name: 'Weighted Pull-up',
        category: 'strength',
        muscleGroups: ['back', 'biceps', 'shoulders'],
        equipment: ['pull-up bar', 'weight belt'],
        description: 'Pull-up with added weight',
      }
    ]
  },

  // Push-up Family
  {
    id: uuidv4(),
    name: 'Push-up',
    category: 'strength',
    muscleGroups: ['chest', 'shoulders', 'triceps'],
    description: 'Fundamental pushing movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Standard Push-up',
        category: 'strength',
        muscleGroups: ['chest', 'shoulders', 'triceps'],
        description: 'Classic push-up form',
      },
      {
        id: uuidv4(),
        name: 'Diamond Push-up',
        category: 'strength',
        muscleGroups: ['chest', 'triceps'],
        description: 'Close hand placement for triceps emphasis',
      },
      {
        id: uuidv4(),
        name: 'Wide Push-up',
        category: 'strength',
        muscleGroups: ['chest', 'shoulders'],
        description: 'Wide hand placement for chest emphasis',
      },
      {
        id: uuidv4(),
        name: 'Decline Push-up',
        category: 'strength',
        muscleGroups: ['upper chest', 'shoulders', 'triceps'],
        equipment: ['bench'],
        description: 'Feet elevated push-up',
      },
      {
        id: uuidv4(),
        name: 'Incline Push-up',
        category: 'strength',
        muscleGroups: ['lower chest', 'shoulders', 'triceps'],
        equipment: ['bench'],
        description: 'Hands elevated push-up for reduced difficulty',
      }
    ]
  },

  // Shoulder Press Family
  {
    id: uuidv4(),
    name: 'Shoulder Press',
    category: 'strength',
    muscleGroups: ['shoulders', 'triceps'],
    description: 'Vertical pressing movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Standing Military Press',
        category: 'strength',
        muscleGroups: ['shoulders', 'triceps'],
        equipment: ['barbell'],
        description: 'Standing overhead press with barbell',
      },
      {
        id: uuidv4(),
        name: 'Seated Dumbbell Press',
        category: 'strength',
        muscleGroups: ['shoulders', 'triceps'],
        equipment: ['dumbbells', 'bench'],
        description: 'Seated overhead press with dumbbells',
      },
      {
        id: uuidv4(),
        name: 'Arnold Press',
        category: 'strength',
        muscleGroups: ['shoulders', 'triceps'],
        equipment: ['dumbbells'],
        description: 'Rotational dumbbell press',
      },
      {
        id: uuidv4(),
        name: 'Push Press',
        category: 'strength',
        muscleGroups: ['shoulders', 'triceps', 'legs'],
        equipment: ['barbell'],
        description: 'Explosive overhead press with leg drive',
      }
    ]
  },

  // Row Family
  {
    id: uuidv4(),
    name: 'Row',
    category: 'strength',
    muscleGroups: ['back', 'biceps'],
    description: 'Horizontal pulling movement',
    variations: [
      {
        id: uuidv4(),
        name: 'Barbell Row',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: ['barbell'],
        description: 'Traditional bent-over row',
      },
      {
        id: uuidv4(),
        name: 'Pendlay Row',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: ['barbell'],
        description: 'Explosive row from floor',
      },
      {
        id: uuidv4(),
        name: 'Dumbbell Row',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: ['dumbbell', 'bench'],
        description: 'Single-arm row with support',
      },
      {
        id: uuidv4(),
        name: 'Seated Cable Row',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: ['cable machine'],
        description: 'Machine-based rowing movement',
      },
      {
        id: uuidv4(),
        name: 'Meadows Row',
        category: 'strength',
        muscleGroups: ['back', 'biceps'],
        equipment: ['barbell'],
        description: 'Unilateral row with landmine attachment',
      }
    ]
  },

  // Olympic Lift Family
  {
    id: uuidv4(),
    name: 'Olympic Lifts',
    category: 'strength',
    muscleGroups: ['full body'],
    equipment: ['barbell'],
    description: 'Explosive weightlifting movements',
    variations: [
      {
        id: uuidv4(),
        name: 'Clean and Jerk',
        category: 'strength',
        muscleGroups: ['full body'],
        equipment: ['barbell'],
        description: 'Two-part Olympic lift',
      },
      {
        id: uuidv4(),
        name: 'Snatch',
        category: 'strength',
        muscleGroups: ['full body'],
        equipment: ['barbell'],
        description: 'Single-movement Olympic lift',
      },
      {
        id: uuidv4(),
        name: 'Power Clean',
        category: 'strength',
        muscleGroups: ['full body'],
        equipment: ['barbell'],
        description: 'Clean variation with higher catch',
      },
      {
        id: uuidv4(),
        name: 'Hang Clean',
        category: 'strength',
        muscleGroups: ['full body'],
        equipment: ['barbell'],
        description: 'Clean from hanging position',
      }
    ]
  },

  // Core Family
  {
    id: uuidv4(),
    name: 'Core',
    category: 'strength',
    muscleGroups: ['core', 'abs', 'obliques'],
    description: 'Core strengthening movements',
    variations: [
      {
        id: uuidv4(),
        name: 'Plank',
        category: 'strength',
        muscleGroups: ['core', 'abs'],
        description: 'Isometric core hold',
      },
      {
        id: uuidv4(),
        name: 'Side Plank',
        category: 'strength',
        muscleGroups: ['core', 'obliques'],
        description: 'Lateral core hold',
      },
      {
        id: uuidv4(),
        name: 'Russian Twist',
        category: 'strength',
        muscleGroups: ['core', 'obliques'],
        equipment: ['weight plate', 'dumbbell'],
        description: 'Rotational core movement',
      },
      {
        id: uuidv4(),
        name: 'Cable Woodchopper',
        category: 'strength',
        muscleGroups: ['core', 'obliques'],
        equipment: ['cable machine'],
        description: 'Dynamic rotational movement',
      },
      {
        id: uuidv4(),
        name: 'Ab Wheel Rollout',
        category: 'strength',
        muscleGroups: ['core', 'abs'],
        equipment: ['ab wheel'],
        description: 'Dynamic core stability exercise',
      }
    ]
  },

  // Cardio Family
  {
    id: uuidv4(),
    name: 'Cardio',
    category: 'cardio',
    muscleGroups: ['full body'],
    description: 'Cardiovascular exercises',
    variations: [
      {
        id: uuidv4(),
        name: 'Running',
        category: 'cardio',
        muscleGroups: ['legs', 'core'],
        variations: [
          {
            id: uuidv4(),
            name: 'Treadmill Running',
            category: 'cardio',
            muscleGroups: ['legs', 'core'],
            equipment: ['treadmill'],
            description: 'Indoor running',
          },
          {
            id: uuidv4(),
            name: 'Outdoor Running',
            category: 'cardio',
            muscleGroups: ['legs', 'core'],
            description: 'Running on various terrains',
          },
          {
            id: uuidv4(),
            name: 'Sprint Intervals',
            category: 'cardio',
            muscleGroups: ['legs', 'core'],
            description: 'High-intensity running intervals',
          }
        ]
      },
      {
        id: uuidv4(),
        name: 'Cycling',
        category: 'cardio',
        muscleGroups: ['legs'],
        variations: [
          {
            id: uuidv4(),
            name: 'Stationary Bike',
            category: 'cardio',
            muscleGroups: ['legs'],
            equipment: ['stationary bike'],
            description: 'Indoor cycling',
          },
          {
            id: uuidv4(),
            name: 'Spin Class',
            category: 'cardio',
            muscleGroups: ['legs'],
            equipment: ['spin bike'],
            description: 'Group cycling workout',
          }
        ]
      },
      {
        id: uuidv4(),
        name: 'Rowing',
        category: 'cardio',
        muscleGroups: ['back', 'legs', 'core', 'arms'],
        equipment: ['rowing machine'],
        description: 'Full-body cardio on rower',
      },
      {
        id: uuidv4(),
        name: 'Jump Rope',
        category: 'cardio',
        muscleGroups: ['legs', 'shoulders'],
        equipment: ['jump rope'],
        description: 'High-intensity rope jumping',
      }
    ]
  }
];

// Helper function to flatten variations for the store
export const getAllExercises = (): Exercise[] => {
  const flattenedExercises: Exercise[] = [];
  
  const flattenVariations = (exercise: Exercise) => {
    flattenedExercises.push(exercise);
    
    if (exercise.variations) {
      exercise.variations.forEach(variation => {
        variation.parentId = exercise.id;
        flattenVariations(variation);
      });
    }
  };
  
  exercises.forEach(exercise => flattenVariations(exercise));
  return flattenedExercises;
};

// Categories remain the same but now use the flattened list
export const exerciseCategories = {
  chest: getAllExercises().filter(e => e.muscleGroups.includes('chest')),
  back: getAllExercises().filter(e => e.muscleGroups.includes('back')),
  legs: getAllExercises().filter(e => 
    e.muscleGroups.includes('quadriceps') || 
    e.muscleGroups.includes('hamstrings') || 
    e.muscleGroups.includes('glutes')
  ),
  shoulders: getAllExercises().filter(e => e.muscleGroups.includes('shoulders')),
  arms: getAllExercises().filter(e => 
    e.muscleGroups.includes('biceps') || 
    e.muscleGroups.includes('triceps')
  ),
  core: getAllExercises().filter(e => e.muscleGroups.includes('core')),
  cardio: getAllExercises().filter(e => e.category === 'cardio'),
  olympic: getAllExercises().filter(e => e.muscleGroups.includes('full body')),
  flexibility: getAllExercises().filter(e => e.category === 'flexibility'),
}; 