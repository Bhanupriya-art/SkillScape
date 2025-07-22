import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const AuthForm = ({ isLogin }) => {
  const { 
    handleLogin, 
    handleSignUp, 
    setCurrentView 
  } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email')
    };
    isLogin ? handleLogin(userData) : handleSignUp(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <Card className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {isLogin ? 'Welcome Back' : 'Join SkillScape'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="w-full p-4 mb-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="w-full p-4 mb-4 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-4 mb-6 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <Button
            type="submit"
            className="w-full p-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
        <p className="text-center text-gray-300 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setCurrentView(isLogin ? 'signup' : 'login')}
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
        <Button
          onClick={() => setCurrentView('landing')}
          variant="ghost"
          className="w-full mt-4 text-white hover:text-white"
        >
          ← Back to Home
        </Button>
      </Card>
    </div>
  );
};