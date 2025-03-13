
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import LoginForm from '../components/auth/LoginForm';
import FadeIn from '../components/animations/FadeIn';

const Login = () => {
  return (
    <div className="min-h-screen bg-secondary/30 dark:bg-secondary/10">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <Link 
            to="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <FadeIn>
            <LoginForm />
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Login;
