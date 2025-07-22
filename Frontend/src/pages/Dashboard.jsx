import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/common/Navbar';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/roadmap/ProgressBar';
import { Calendar, BookOpen, Award } from 'lucide-react';

export const Dashboard = () => {
  const { 
    selectedGoal, 
    roadmaps, 
    userProgress, 
    studyGroups,
    setCurrentView
  } = useContext(AppContext);

  const completedSteps = selectedGoal ? roadmaps[selectedGoal.id]?.filter(step => userProgress[step.id]).length || 0 : 0;
  const totalSteps = selectedGoal ? roadmaps[selectedGoal.id]?.length || 0 : 0;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Overview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
              {selectedGoal ? (
                <div>
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{selectedGoal.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedGoal.title}</h3>
                      <p className="text-gray-600">Progress: {completedSteps}/{totalSteps} steps completed</p>
                    </div>
                  </div>
                  <ProgressBar percentage={progressPercentage} />
                  <p className="text-lg font-semibold text-purple-600">{Math.round(progressPercentage)}% Complete</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Goal Selected</h3>
                  <p className="text-gray-600 mb-4">Select a goal to start tracking your progress</p>
                  <Button 
                    onClick={() => setCurrentView('goals')}
                    variant="primary"
                  >
                    Choose Your Path
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
                <Calendar className="w-8 h-8 mb-3" />
                <h3 className="text-2xl font-bold">7</h3>
                <p>Days Streak</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <BookOpen className="w-8 h-8 mb-3" />
                <h3 className="text-2xl font-bold">{completedSteps}</h3>
                <p>Completed Steps</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6">
                <Award className="w-8 h-8 mb-3" />
                <h3 className="text-2xl font-bold">3</h3>
                <p>Achievements</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Active Study Groups */}
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Groups</h3>
              {studyGroups.slice(0, 3).map(group => (
                <div key={group.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{group.name}</p>
                    <p className="text-sm text-gray-600">{group.members} members</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${group.active ? 'bg-green-400' : 'bg-gray-300'}`}></div>
                </div>
              ))}
              <Button 
                onClick={() => setCurrentView('groups')}
                variant="ghost"
                className="w-full mt-4 text-purple-600 hover:text-purple-800"
              >
                View All Groups →
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white mt-1">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Completed JavaScript Basics</p>
                    <p className="text-xs text-gray-600">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white mt-1">
                    👥
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Joined MERN Stack Masters</p>
                    <p className="text-xs text-gray-600">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white mt-1">
                    🎯
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Set new goal: Web Developer</p>
                    <p className="text-xs text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};