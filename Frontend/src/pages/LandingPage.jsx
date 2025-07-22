import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { Target, Users, TrendingUp } from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentView } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-3xl font-bold text-white">SkillScape</div>
        <div className="space-x-4">
          <Button 
            onClick={() => setCurrentView('login')}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-purple-900"
          >
            Login
          </Button>
          <Button 
            onClick={() => setCurrentView('signup')}
            variant="primary"
          >
            Sign Up
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          Your Journey to <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Success</span> Starts Here
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Get personalized learning roadmaps, track your progress, and connect with fellow students. 
          SkillScape transforms your engineering dreams into achievable milestones.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <Target className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Personalized Roadmaps</h3>
            <p className="text-gray-300">Tailored learning paths based on your career goals</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Study Groups</h3>
            <p className="text-gray-300">Connect and learn with peers on similar journeys</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Track Progress</h3>
            <p className="text-gray-300">Monitor your learning journey and celebrate wins</p>
          </div>
        </div>
        <Button 
          onClick={() => setCurrentView('signup')}
          variant="primary"
          className="px-8 py-4 text-lg font-semibold transform hover:scale-105 shadow-2xl"
        >
          Start Your Journey
        </Button>
      </div>
    </div>
  );
};