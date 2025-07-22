export const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-medium transition-all';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700',
    secondary: 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50',
    outline: 'bg-transparent text-purple-600 border border-purple-600 hover:bg-purple-50',
    ghost: 'bg-transparent text-purple-600 hover:bg-purple-50'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};