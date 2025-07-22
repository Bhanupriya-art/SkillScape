import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { MessageCircle, Star } from 'lucide-react';

export const Chat = () => {
  const { chatMessages, newMessage, setNewMessage, sendMessage } = useContext(AppContext);

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-xl">
        <h3 className="font-semibold flex items-center space-x-2">
          <MessageCircle className="w-5 h-5" />
          <span>MERN Stack Masters</span>
        </h3>
        <p className="text-purple-100 text-sm">124 members • 12 online</p>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {chatMessages.map(message => (
            <div key={message.id} className="bg-white rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-purple-600">{message.user}</span>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
              <p className="text-gray-700 text-sm">{message.message}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t bg-white rounded-b-xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button
            onClick={sendMessage}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};