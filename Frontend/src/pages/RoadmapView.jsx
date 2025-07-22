import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/common/Navbar';
import { RoadmapStep } from '../components/roadmap/RoadmapStep';
import { ProgressBar } from '../components/roadmap/ProgressBar';
import { Button } from '../components/common/Button';

export const RoadmapView = () => {
  const { 
    selectedGoal, 
    roadmaps, 
    userProgress, 
    setCurrentView
  } = useContext(AppContext);

  if (!selectedGoal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Goal Selected</h2>
          <Button
            onClick={() => setCurrentView('goals')}
            variant="primary"
          >
            Choose Your Path
          </Button>
        </div>
      </div>
    );
  }

  // Add this additional check
  const currentRoadmap = roadmaps[selectedGoal.id];
  if (!currentRoadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Roadmap Not Available</h2>
          <p className="text-gray-600 mb-4">No roadmap defined for this goal yet</p>
          <Button
            onClick={() => setCurrentView('goals')}
            variant="primary"
          >
            Back to Goals
          </Button>
        </div>
      </div>
    );
  }

  const completedSteps = currentRoadmap.filter(step => userProgress[step.id]).length;
  const totalSteps = currentRoadmap.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4">{selectedGoal.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{selectedGoal.title}</h1>
              <p className="text-gray-600">{selectedGoal.description}</p>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {completedSteps}/{totalSteps} steps
              </span>
              <span className="text-sm font-semibold text-purple-600">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <ProgressBar percentage={progressPercentage} />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {currentRoadmap.map((step, index) => (
            <RoadmapStep 
              key={step.id} 
              step={step} 
              isLast={index === currentRoadmap.length - 1}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};