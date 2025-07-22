import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, currentView, setCurrentView, setCurrentUser } = useContext(AppContext);

  const navItems = [
    { view: 'dashboard', label: 'Dashboard' },
    { view: 'roadmap', label: 'Roadmap' },
    { view: 'groups', label: 'Study Groups' },
    { view: 'laptop', label: 'Laptop Advisor' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">SkillScape</div>
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`${currentView === item.view ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            {currentUser && (
              <>
                <span className="flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-1" />
                  {currentUser.name}
                </span>
                <button
                  onClick={() => { setCurrentUser(null); setCurrentView('landing'); }}
                  className="text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};