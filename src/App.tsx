import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WorkoutPage from './components/workout/WorkoutPage';
import { useWorkoutStore } from './store/workoutStore';
import { useNavigate } from 'react-router-dom';
import { Workout, WorkoutExercise } from './types/workout';
import { useState } from 'react';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="workouts" element={<WorkoutPage />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function Dashboard() {
  const { workoutHistory, goals } = useWorkoutStore();
  const navigate = useNavigate();

  // Calculate progress metrics
  const thisWeekWorkouts = workoutHistory.filter((workout: Workout) => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    return workoutDate >= weekStart;
  });

  const weeklyProgress = goals.weeklyWorkouts > 0 
    ? (thisWeekWorkouts.length / goals.weeklyWorkouts) * 100
    : 0;

  // Calculate monthly goal progress
  const thisMonthWorkouts = workoutHistory.filter((workout: Workout) => {
    const workoutDate = new Date(workout.date);
    const today = new Date();
    return workoutDate.getMonth() === today.getMonth() && 
           workoutDate.getFullYear() === today.getFullYear();
  });
  
  const monthlyProgress = goals.monthlyWorkouts > 0
    ? (thisMonthWorkouts.length / goals.monthlyWorkouts) * 100
    : 0;

  // Get the most recent workout
  const latestWorkout = workoutHistory[workoutHistory.length - 1];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {!goals.hasSetInitialGoals && (
        <div className="card bg-primary-50 border-primary-200">
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-primary-900">Welcome to Your Fitness Journey!</h3>
              <p className="mt-1 text-sm text-primary-700">
                To get started, set your workout goals in your profile. This will help us track your progress
                and keep you motivated.
              </p>
            </div>
            <button
              onClick={() => navigate('/profile')}
              className="btn-primary text-sm"
            >
              Set Goals
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Today's Workout Card */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900">Today's Workout</h2>
          <p className="mt-1 text-sm text-gray-500">
            {latestWorkout && new Date(latestWorkout.date).toDateString() === new Date().toDateString()
              ? `Continue your workout: ${latestWorkout.name}`
              : "Ready to start your workout?"}
          </p>
          <button 
            onClick={() => navigate('/workouts')} 
            className="btn-primary mt-4"
          >
            Start Workout
          </button>
        </div>

        {/* Weekly Progress Card */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900">Weekly Progress</h2>
          <p className="mt-1 text-sm text-gray-500">
            {thisWeekWorkouts.length} of {goals.weeklyWorkouts || '0'} workouts completed
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="h-2 bg-primary-200 rounded-full">
                  <div 
                    className="h-2 bg-primary-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {goals.weeklyWorkouts > 0 ? `${Math.round(weeklyProgress)}%` : '-'}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              {!goals.hasSetInitialGoals 
                ? "Set your weekly goal in profile"
                : weeklyProgress >= 100 
                ? "Great job! You've hit your weekly goal!" 
                : `${goals.weeklyWorkouts - thisWeekWorkouts.length} more workouts to reach your goal`}
            </p>
          </div>
        </div>

        {/* Monthly Goals Card */}
        <div className="card">
          <h2 className="text-lg font-medium text-gray-900">Monthly Goals</h2>
          <p className="mt-1 text-sm text-gray-500">
            {thisMonthWorkouts.length} of {goals.monthlyWorkouts || '0'} workouts completed
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="h-2 bg-primary-200 rounded-full">
                  <div 
                    className="h-2 bg-primary-600 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(monthlyProgress, 100)}%` }}
                  ></div>
                </div>
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {goals.monthlyWorkouts > 0 ? `${Math.round(monthlyProgress)}%` : '-'}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              {!goals.hasSetInitialGoals 
                ? "Set your monthly goal in profile"
                : monthlyProgress >= 100 
                ? "Amazing! You've achieved your monthly goal!" 
                : `${goals.monthlyWorkouts - thisMonthWorkouts.length} more workouts this month`}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Workouts Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Workouts</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workoutHistory.length === 0 ? (
            <div className="card col-span-full text-center">
              <p className="text-gray-500">No workouts yet. Start your first workout to track your progress!</p>
            </div>
          ) : (
            workoutHistory.slice(-3).reverse().map((workout: Workout) => (
              <div key={workout.id} className="card">
                <h3 className="text-md font-medium text-gray-900">{workout.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(workout.date).toLocaleDateString()}
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {workout.exercises.length} exercises
                    {workout.duration && ` • ${workout.duration} minutes`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {workout.exercises.map((ex: WorkoutExercise) => ex.name).slice(0, 2).join(', ')}
                    {workout.exercises.length > 2 && ` +${workout.exercises.length - 2} more`}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Schedule() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
      <div className="card">
        <p className="text-gray-500">Schedule feature coming soon...</p>
      </div>
    </div>
  );
}

function Profile() {
  const { goals, updateGoals } = useWorkoutStore();
  const [weeklyGoal, setWeeklyGoal] = useState(goals.weeklyWorkouts);
  const [monthlyGoal, setMonthlyGoal] = useState(goals.monthlyWorkouts);
  const [isEditing, setIsEditing] = useState(!goals.hasSetInitialGoals);

  const handleSaveGoals = () => {
    updateGoals({
      weeklyWorkouts: weeklyGoal,
      monthlyWorkouts: monthlyGoal,
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
      
      {/* Workout Goals Card */}
      <div className="card">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {!goals.hasSetInitialGoals ? 'Set Your Workout Goals' : 'Workout Goals'}
          </h2>
          {goals.hasSetInitialGoals && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {isEditing ? 'Cancel' : 'Edit Goals'}
            </button>
          )}
        </div>

        {!goals.hasSetInitialGoals && (
          <p className="mt-2 text-sm text-gray-500">
            Welcome! Let's start by setting your workout goals. This will help us track your progress
            and keep you motivated on your fitness journey.
          </p>
        )}

        {isEditing ? (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weekly Workout Goal
              </label>
              <input
                type="number"
                min="1"
                max="7"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Math.max(1, Math.min(7, parseInt(e.target.value) || 1)))}
                className="mt-1 input-field w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Set how many workouts you aim to complete each week (1-7)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Workout Goal
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(Math.max(1, Math.min(31, parseInt(e.target.value) || 1)))}
                className="mt-1 input-field w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                Set how many workouts you aim to complete each month (1-31)
              </p>
            </div>

            <button
              onClick={handleSaveGoals}
              className="btn-primary w-full"
            >
              {goals.hasSetInitialGoals ? 'Save Goals' : 'Start Tracking'}
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-gray-600">Weekly Goal</p>
              <p className="text-lg font-medium text-gray-900">
                {goals.weeklyWorkouts} workouts per week
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Goal</p>
              <p className="text-lg font-medium text-gray-900">
                {goals.monthlyWorkouts} workouts per month
              </p>
            </div>
          </div>
        )}
      </div>

      {/* User Settings Card - Placeholder for future features */}
      <div className="card">
        <h2 className="text-lg font-medium text-gray-900">User Settings</h2>
        <p className="mt-1 text-sm text-gray-500">More settings coming soon...</p>
      </div>
    </div>
  );
}

export default App;

