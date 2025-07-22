import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const goals = [
    {
      id: 1,
      title: "Get Placed in IT Company",
      description: "Complete roadmap to land your dream IT job",
      icon: "💼",
      duration: "6-8 months",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Become a Web Developer",
      description: "Master frontend and backend development",
      icon: "🌐",
      duration: "4-6 months",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Data Scientist Path",
      description: "Learn data analysis, ML, and AI",
      icon: "📊",
      duration: "8-10 months",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "Mobile App Developer",
      description: "Build iOS and Android applications",
      icon: "📱",
      duration: "5-7 months",
      difficulty: "Intermediate"
    }
  ];

  const roadmaps = {
    1: [
      { id: 1, title: "Programming Fundamentals", completed: true, topics: ["Variables & Data Types", "Control Structures", "Functions"] },
      { id: 2, title: "Data Structures & Algorithms", completed: true, topics: ["Arrays", "Linked Lists", "Trees", "Sorting"] },
      { id: 3, title: "Database Management", completed: false, topics: ["SQL Basics", "Database Design", "Queries"] },
      { id: 4, title: "Web Development Basics", completed: false, topics: ["HTML", "CSS", "JavaScript"] },
      { id: 5, title: "Framework Learning", completed: false, topics: ["React/Angular", "Node.js", "APIs"] },
      { id: 6, title: "System Design", completed: false, topics: ["Scalability", "Load Balancing", "Microservices"] },
      { id: 7, title: "Interview Preparation", completed: false, topics: ["Mock Interviews", "Coding Practice", "Resume Building"] }
    ],
    2: [
      { id: 1, title: "HTML & CSS Foundations", completed: true, topics: ["Semantic HTML", "CSS Grid", "Flexbox"] },
      { id: 2, title: "JavaScript Mastery", completed: true, topics: ["ES6+", "DOM Manipulation", "Async Programming"] },
      { id: 3, title: "React Development", completed: false, topics: ["Components", "Hooks", "State Management"] },
      { id: 4, title: "Backend with Node.js", completed: false, topics: ["Express.js", "MongoDB", "APIs"] },
      { id: 5, title: "Advanced Topics", completed: false, topics: ["Testing", "Deployment", "Performance"] },
      { id: 6, title: "Portfolio Projects", completed: false, topics: ["E-commerce Site", "Social Media App", "Dashboard"] }
    ]
  };

  const studyGroups = [
    { id: 1, name: "MERN Stack Masters", members: 124, active: true },
    { id: 2, name: "Algorithm Crushers", members: 89, active: true },
    { id: 3, name: "Interview Prep Squad", members: 156, active: false },
    { id: 4, name: "Frontend Fanatics", members: 203, active: true }
  ];

  const laptopRecommendations = [
    {
      id: 1,
      name: "MacBook Air M2",
      price: "$999",
      specs: "8GB RAM, 256GB SSD",
      rating: 4.8,
      bestFor: "Web Development, Design"
    },
    {
      id: 2,
      name: "Dell XPS 13",
      price: "$849",
      specs: "16GB RAM, 512GB SSD",
      rating: 4.6,
      bestFor: "Programming, Portability"
    },
    {
      id: 3,
      name: "ThinkPad X1 Carbon",
      price: "$1299",
      specs: "16GB RAM, 1TB SSD",
      rating: 4.7,
      bestFor: "Business, Development"
    }
  ];

  useEffect(() => {
    // Initialize with some mock chat messages
    setChatMessages([
      { id: 1, user: "Alex", message: "Anyone working on the React roadmap?", time: "10:30 AM" },
      { id: 2, user: "Sarah", message: "Yes! Just finished the hooks section. It's amazing!", time: "10:32 AM" },
      { id: 3, user: "Mike", message: "Can someone explain useEffect? I'm struggling with it.", time: "10:35 AM" }
    ]);
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignUp = (userData) => {
    setCurrentUser(userData);
    setCurrentView('goals');
  };

  const selectGoal = (goal) => {
    setSelectedGoal(goal);
    setCurrentView('roadmap');
  };

  const toggleStepCompletion = (stepId) => {
    setUserProgress(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        user: currentUser?.name || "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      currentView,
      selectedGoal,
      userProgress,
      chatMessages,
      newMessage,
      goals,
      roadmaps,
      studyGroups,
      laptopRecommendations,
      setCurrentView,
      handleLogin,
      handleSignUp,
      selectGoal,
      toggleStepCompletion,
      setNewMessage,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};