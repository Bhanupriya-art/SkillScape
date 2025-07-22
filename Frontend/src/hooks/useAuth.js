import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useAuth = () => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }

  return {
    currentUser: context.currentUser,
    handleLogin: context.handleLogin,
    handleSignUp: context.handleSignUp,
    logout: () => {
      context.setCurrentUser(null);
      context.setCurrentView('landing');
    }
  };
};