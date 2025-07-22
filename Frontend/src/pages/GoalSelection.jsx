import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { GoalCard } from '../components/goals/GoalCard';

export const GoalSelection = () => {
  const { goals } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-300">Select your career goal to get a personalized learning roadmap</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </div>
  );
};