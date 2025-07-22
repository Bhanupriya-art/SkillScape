import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/common/Navbar';
import { GroupCard } from '../components/groups/GroupCard';
import { Chat } from '../components/groups/Chat';
import { Button } from '../components/common/Button';

export const StudyGroups = () => {
  const { studyGroups } = useContext(AppContext);

  const handleJoinGroup = (groupId) => {
    // In a real app, this would call an API
    console.log(`Joining group ${groupId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Study Groups List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Study Groups</h1>
              <Button 
                variant="primary"
                className="flex items-center space-x-2"
              >
                <span>Create Group</span>
              </Button>
            </div>
            
            <div className="grid gap-6">
              {studyGroups.map(group => (
                <GroupCard 
                  key={group.id} 
                  group={group} 
                  onJoin={handleJoinGroup}
                />
              ))}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div>
            <Chat />
            
            {/* Online Members */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Online Now (12)</span>
              </h4>
              <div className="space-y-2">
                {['Alex Kumar', 'Priya Singh', 'Rohit Sharma', 'Anita Patel'].map((name, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};