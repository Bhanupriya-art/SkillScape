import { AuthForm } from '../components/auth/AuthForm';

export const AuthPage = ({ isLogin }) => {
  return <AuthForm isLogin={isLogin} />;
};