import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navbar } from '../components/common/Navbar';
import { LaptopCard } from '../components/laptops/LaptopCard';
import { Button } from '../components/common/Button';
import { BookOpen, TrendingUp, MessageCircle } from 'lucide-react';

export const LaptopAdvisor = () => {
  const { laptopRecommendations } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💻 Laptop Advisor</h1>
          <p className="text-xl text-gray-600">Find the perfect laptop for your programming journey</p>
        </div>

        {/* Questionnaire */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border-t-4 border-purple-500">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center space-x-3">
            <span className="text-purple-600">🎯</span>
            <span>Tell us about your needs</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">💰 Budget Range</label>
              <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                <option>Under ₹60,000</option>
                <option>₹60,000 - ₹90,000</option>
                <option>₹90,000 - ₹1,30,000</option>
                <option>Above ₹1,30,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">🎯 Primary Use</label>
              <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                <option>Web Development</option>
                <option>Mobile App Development</option>
                <option>Data Science & ML</option>
                <option>Game Development</option>
                <option>General Programming</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">🎒 Portability</label>
              <select className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all">
                <option>Very Important (Travel a lot)</option>
                <option>Somewhat Important</option>
                <option>Not Important (Desktop replacement)</option>
              </select>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button 
              variant="primary"
              className="px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105"
            >
              🔍 Get My Recommendations
            </Button>
          </div>
        </div>

        {/* Recommended Laptops */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Top Recommendations for You</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {laptopRecommendations.map((laptop, index) => (
              <LaptopCard 
                key={laptop.id} 
                laptop={laptop} 
                isBestChoice={index === 0}
              />
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span>💡 Buying Guide for Students</span>
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Essential Specs for Programming:</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>• <strong>RAM:</strong> Minimum 8GB (16GB recommended)</li>
                  <li>• <strong>Storage:</strong> SSD for faster performance</li>
                  <li>• <strong>Processor:</strong> Intel i5/AMD Ryzen 5 or better</li>
                  <li>• <strong>Display:</strong> Full HD (1920x1080) minimum</li>
                  <li>• <strong>Keyboard:</strong> Comfortable for long coding sessions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <span>💰 Money-Saving Tips</span>
            </h2>
            <div className="space-y-4">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span>🎓</span>
                  <span><strong>Student Discounts:</strong> Check with manufacturers for education pricing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>🔄</span>
                  <span><strong>Refurbished Options:</strong> Consider certified refurbished models</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>🛍️</span>
                  <span><strong>Sales Events:</strong> Wait for festive sales and back-to-school offers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            <span>❓ Frequently Asked Questions</span>
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q: What laptop is best for coding as a beginner?</h3>
              <p className="text-gray-600">A: For beginners, focus on at least 8GB RAM, an SSD, and a comfortable keyboard. Our top pick is usually a mid-range laptop with these specs rather than the most expensive option.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Q: Should I buy a Mac or Windows laptop for programming?</h3>
              <p className="text-gray-600">A: Both work great! Windows offers more budget options and better for gaming/general use. Mac is excellent for iOS development and has a Unix-based terminal. Choose based on your budget and specific needs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};