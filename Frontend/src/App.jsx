import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { GoalSelection } from './pages/GoalSelection';
import { RoadmapView } from './pages/RoadmapView';
import { StudyGroups } from './pages/StudyGroups';
import { LaptopAdvisor } from './pages/LaptopAdvisor';

function App() {
  const { currentView } = useContext(AppContext);

  switch (currentView) {
    case 'landing':
      return <LandingPage />;
    case 'login':
      return <AuthPage isLogin={true} />;
    case 'signup':
      return <AuthPage isLogin={false} />;
    case 'goals':
      return <GoalSelection />;
    case 'dashboard':
      return <Dashboard />;
    case 'roadmap':
      return <RoadmapView />;
    case 'groups':
      return <StudyGroups />;
    case 'laptop':
      return <LaptopAdvisor />;
    default:
      return <LandingPage />;
  }
}

export default App;