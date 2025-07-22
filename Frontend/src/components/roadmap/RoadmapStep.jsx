import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { CheckCircle, Circle } from 'lucide-react';
import { Button } from '../common/Button';

export const RoadmapStep = ({ step, isLast, index }) => {
  const { userProgress, toggleStepCompletion } = useContext(AppContext);

  return (
    <div className="relative">
      {/* Connector Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-16 bg-gray-300"></div>
      )}
      
      <div className="flex items-start space-x-6 mb-8">
        <div 
          className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
            userProgress[step.id] 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
          }`}
          onClick={() => toggleStepCompletion(step.id)}
        >
          {userProgress[step.id] ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <Circle className="w-6 h-6" />
          )}
        </div>
        
        <div className="flex-1">
          <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 ${
            userProgress[step.id] ? 'border-green-500' : 'border-gray-300'
          }`}>
            <h3 className={`text-xl font-semibold mb-3 ${
              userProgress[step.id] ? 'text-green-700' : 'text-gray-800'
            }`}>
              {index + 1}. {step.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {step.topics.map((topic, topicIndex) => (
                <span 
                  key={topicIndex}
                  className={`px-3 py-1 rounded-full text-sm ${
                    userProgress[step.id] 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}
                >
                  {topic}
                </span>
              ))}
            </div>
            <Button 
              onClick={() => toggleStepCompletion(step.id)}
              className={`${
                userProgress[step.id]
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {userProgress[step.id] ? 'Completed ✓' : 'Mark as Complete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};