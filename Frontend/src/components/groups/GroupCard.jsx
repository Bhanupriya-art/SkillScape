import { Users, MessageCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const GroupCard = ({ group, onJoin }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
            <div className={`w-2 h-2 rounded-full ${group.active ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{group.members} members</span>
            </span>
            <span className={`text-sm ${group.active ? 'text-green-600' : 'text-gray-500'}`}>
              {group.active ? 'Active now' : 'Offline'}
            </span>
          </div>
        </div>
        <Button 
          onClick={() => onJoin(group.id)}
          className="flex items-center space-x-2"
        >
          <Users className="w-4 h-4" />
          <span>Join</span>
        </Button>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <MessageCircle className="w-4 h-4" />
          <span>Recent Discussions</span>
        </h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-lg">🔥</span>
            <p className="text-gray-600 text-sm">"Best resources for React hooks? Need help understanding useEffect"</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lg">💡</span>
            <p className="text-gray-600 text-sm">"Interview preparation strategy - let's practice together!"</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-lg">📚</span>
            <p className="text-gray-600 text-sm">"Sharing my data structures study plan for next month"</p>
          </div>
        </div>
      </div>
    </div>
  );
};