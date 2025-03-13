import { useState } from 'react';
import { useWorkoutStore } from '../../store/workoutStore';
import { Exercise, Set as WorkoutSet } from '../../types/workout';
import { v4 as uuidv4 } from 'uuid';

export default function WorkoutPage() {
  const { currentWorkout, startNewWorkout, addExerciseToWorkout, updateSet, completeWorkout, cancelWorkout } = useWorkoutStore();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    category: 'strength',
  });

  const getExerciseCountText = (count: number) => {
    if (count === 0) return 'No exercises';
    if (count === 1) return '1 exercise';
    return `${count} exercises`;
  };

  const handleStartWorkout = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    startNewWorkout(`Workout ${formattedDate}`);
  };

  const handleAddExercise = () => {
    if (!newExercise.name) return;

    const exercise: Exercise = {
      id: uuidv4(),
      name: newExercise.name,
      category: newExercise.category || 'strength',
      muscleGroups: newExercise.muscleGroups,
      description: newExercise.description,
      equipment: newExercise.equipment,
    };

    addExerciseToWorkout(exercise);
    setIsAddingExercise(false);
    setNewExercise({ category: 'strength' });
  };

  const handleUpdateSet = (exerciseIndex: number, setIndex: number, field: string, value: number) => {
    updateSet(exerciseIndex, setIndex, { [field]: value });
  };

  const handleAddSet = (exerciseIndex: number) => {
    const exercise = currentWorkout?.exercises[exerciseIndex];
    if (!exercise) return;

    const newSet: WorkoutSet = {
      id: uuidv4(),
      completed: false,
    };

    const lastSet = exercise.sets[exercise.sets.length - 1];
    if (lastSet) {
      // Copy values from the last set as defaults
      if (exercise.category === 'strength') {
        newSet.weight = lastSet.weight;
        newSet.reps = lastSet.reps;
      } else if (exercise.category === 'cardio') {
        newSet.duration = lastSet.duration;
        newSet.distance = lastSet.distance;
      }
    }

    updateSet(exerciseIndex, exercise.sets.length, newSet);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Workout</h1>
        {!currentWorkout && (
          <button
            onClick={handleStartWorkout}
            className="btn-primary"
          >
            Start New Workout
          </button>
        )}
      </div>

      {currentWorkout ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
            <div className="flex flex-col space-y-4">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{currentWorkout.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      In Progress
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {Math.round((new Date().getTime() - new Date(currentWorkout.date).getTime()) / 60000)}m
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {currentWorkout.exercises.reduce((total, ex) => total + ex.sets.filter(set => set.completed).length, 0)} sets done
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={cancelWorkout}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={completeWorkout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Complete
                  </button>
                </div>
              </div>

              {/* Exercise Summary */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{currentWorkout.exercises.length}</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {currentWorkout.exercises.length === 0 ? 'No exercises yet' :
                         currentWorkout.exercises.length === 1 ? '1 exercise' :
                         `${currentWorkout.exercises.length} exercises`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {currentWorkout.exercises.length === 0 ? 'Add your first exercise to get started' : 'Keep going strong!'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercise Categories */}
              {currentWorkout.exercises.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.from(new Set(currentWorkout.exercises.map(ex => ex.category))).map(category => (
                    <span 
                      key={category}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-gray-800 shadow-sm"
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-4">
            {currentWorkout.exercises.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{exercise.name}</h3>
                    {exercise.description && (
                      <p className="text-sm text-gray-500">{exercise.description}</p>
                    )}
                    {exercise.muscleGroups && exercise.muscleGroups.length > 0 && (
                      <p className="text-xs text-gray-500 mt-1">
                        Muscles: {exercise.muscleGroups.join(', ')}
                      </p>
                    )}
                    {exercise.equipment && exercise.equipment.length > 0 && (
                      <p className="text-xs text-gray-500">
                        Equipment: {exercise.equipment.join(', ')}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleAddSet(exerciseIndex)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Add Set
                  </button>
                </div>
                
                {/* Sets */}
                <div className="mt-4 space-y-2">
                  {exercise.sets.map((set, setIndex) => (
                    <div key={set.id} className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">Set {setIndex + 1}</span>
                      {exercise.category === 'strength' && (
                        <>
                          <input
                            type="number"
                            placeholder="Weight"
                            className="input-field w-24"
                            value={set.weight || ''}
                            onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'weight', Number(e.target.value))}
                          />
                          <input
                            type="number"
                            placeholder="Reps"
                            className="input-field w-24"
                            value={set.reps || ''}
                            onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'reps', Number(e.target.value))}
                          />
                        </>
                      )}
                      {exercise.category === 'cardio' && (
                        <>
                          <input
                            type="number"
                            placeholder="Duration (sec)"
                            className="input-field w-32"
                            value={set.duration || ''}
                            onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'duration', Number(e.target.value))}
                          />
                          <input
                            type="number"
                            placeholder="Distance (m)"
                            className="input-field w-32"
                            value={set.distance || ''}
                            onChange={(e) => handleUpdateSet(exerciseIndex, setIndex, 'distance', Number(e.target.value))}
                          />
                        </>
                      )}
                      <button
                        onClick={() => updateSet(exerciseIndex, setIndex, { completed: !set.completed })}
                        className={`px-3 py-1 rounded ${
                          set.completed
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {set.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Exercise Button */}
          <button
            onClick={() => setIsAddingExercise(true)}
            className="btn-secondary w-full"
          >
            Add Exercise
          </button>

          {/* Add Exercise Modal */}
          {isAddingExercise && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 max-w-lg w-full space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Add Exercise</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
                    <input
                      type="text"
                      className="mt-1 input-field w-full"
                      value={newExercise.name || ''}
                      onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                      placeholder="e.g., Bench Press"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      className="mt-1 input-field w-full"
                      value={newExercise.category}
                      onChange={(e) => setNewExercise({ ...newExercise, category: e.target.value as Exercise['category'] })}
                    >
                      <option value="strength">Strength</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibility">Flexibility</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description (optional)</label>
                    <textarea
                      className="mt-1 input-field w-full"
                      value={newExercise.description || ''}
                      onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                      placeholder="Exercise description or notes"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Equipment (optional)</label>
                    <input
                      type="text"
                      className="mt-1 input-field w-full"
                      value={newExercise.equipment?.join(', ') || ''}
                      onChange={(e) => setNewExercise({ 
                        ...newExercise, 
                        equipment: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                      })}
                      placeholder="e.g., barbell, bench (comma-separated)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Muscle Groups (optional)</label>
                    <input
                      type="text"
                      className="mt-1 input-field w-full"
                      value={newExercise.muscleGroups?.join(', ') || ''}
                      onChange={(e) => setNewExercise({ 
                        ...newExercise, 
                        muscleGroups: e.target.value.split(',').map(item => item.trim()).filter(Boolean)
                      })}
                      placeholder="e.g., chest, shoulders, triceps (comma-separated)"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setIsAddingExercise(false);
                      setNewExercise({ category: 'strength' });
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddExercise}
                    className="btn-primary flex-1"
                    disabled={!newExercise.name}
                  >
                    Add Exercise
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No active workout. Start a new one to begin tracking your exercises.</p>
        </div>
      )}
    </div>
  );
} 