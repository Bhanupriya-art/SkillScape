import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../common/Button';

export const GoalCard = ({ goal }) => {
  const { selectGoal } = useContext(AppContext);

  return (
    <div 
      onClick={() => selectGoal(goal)}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-8 cursor-pointer hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20"
    >
      <div className="text-6xl mb-4">{goal.icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{goal.title}</h3>
      <p className="text-gray-300 mb-4">{goal.description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
          {goal.duration}
        </span>
        <span className="bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full text-sm">
          {goal.difficulty}
        </span>
      </div>
    </div>
  );
};