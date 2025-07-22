import { Laptop, Star } from 'lucide-react';
import { Button } from '../common/Button';

export const LaptopCard = ({ laptop, isBestChoice }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 border">
      {isBestChoice && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-center py-2 font-semibold">
          🥇 BEST CHOICE
        </div>
      )}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <Laptop className="w-12 h-12" />
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-300 fill-current" />
            <span className="font-bold">{laptop.rating}</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{laptop.name}</h3>
        <p className="text-purple-100 mb-3">{laptop.specs}</p>
        <span className="text-3xl font-bold">{laptop.price}</span>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">🎯 Best for: </span>
          <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded">
            {laptop.bestFor}
          </span>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-2">✨ Key Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Fast SSD for quick boot times</li>
            <li>• Great display for coding</li>
            <li>• Excellent build quality</li>
            <li>• Long battery life</li>
          </ul>
        </div>
        
        <div className="space-y-3">
          <Button 
            variant="primary"
            className="w-full flex items-center justify-center space-x-2"
          >
            <span>📋</span>
            <span>View Full Details</span>
          </Button>
          <Button 
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
          >
            <span>⚖️</span>
            <span>Add to Compare</span>
          </Button>
        </div>
      </div>
    </div>
  );
};