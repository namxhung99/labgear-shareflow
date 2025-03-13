
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Clock, BarChart4 } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import FadeIn from '../components/animations/FadeIn';

const Index = () => {
  // Hero section parallax effect
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
        heroRef.current.style.opacity = `${1 - scrollY * 0.002}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Simplified Borrowing',
      description: 'Request equipment with just a few clicks, keeping track of your borrowing status in real-time.',
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Management',
      description: 'Role-based access control and detailed logs ensure equipment is handled responsibly.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Time Efficient',
      description: 'Automated processes for borrowing, returning, and managing lab equipment.',
    },
    {
      icon: <BarChart4 size={24} />,
      title: 'Analytics & Reporting',
      description: 'Comprehensive insights into equipment usage, maintenance status, and availability.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-primary/5 dark:bg-primary/10">
        <div ref={heroRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent opacity-60" />
          <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[70%] bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px]" />
        </div>
        
        <Container className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <FadeIn delay={100} direction="up">
            <h1 className="text-4xl font-display font-bold sm:text-5xl md:text-6xl lg:text-7xl tracking-tight max-w-4xl">
              Modern <span className="text-primary">Lab Equipment</span> Management System
            </h1>
          </FadeIn>
          
          <FadeIn delay={200} direction="up">
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Simplify equipment borrowing and management for university labs with our secure and efficient platform. Track devices, manage approvals, and get real-time status updates.
            </p>
          </FadeIn>
          
          <FadeIn delay={300} direction="up">
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="btn-primary">
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/equipment" className="btn-secondary">
                Browse Equipment
              </Link>
            </div>
          </FadeIn>
        </Container>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-foreground flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-foreground rounded-full animate-[slide-down_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-padding bg-background">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Streamline Your Lab Equipment Management
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-4 text-lg text-muted-foreground">
                Our platform provides a complete solution for managing, borrowing, and returning lab equipment with ease.
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <div className="glass-panel p-6 h-full hover:translate-y-[-4px] transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      
      {/* How It Works Section */}
      <section className="section-padding bg-secondary/30 dark:bg-secondary/10">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeIn>
              <h2 className="text-3xl font-bold sm:text-4xl">
                How It Works
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="mt-4 text-lg text-muted-foreground">
                Follow these simple steps to start borrowing lab equipment
              </p>
            </FadeIn>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create an Account',
                description: 'Sign up with your phone number and verify your identity to create an account.'
              },
              {
                step: '02',
                title: 'Browse Equipment',
                description: 'Explore available lab equipment and check their status and specifications.'
              },
              {
                step: '03',
                title: 'Request & Return',
                description: 'Submit borrowing requests and return equipment when you\'re done.'
              }
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 100} className="h-full">
                <div className="glass-panel p-8 h-full relative overflow-hidden">
                  <span className="absolute -top-6 -right-6 text-[120px] font-bold text-primary/10 pointer-events-none">
                    {item.step}
                  </span>
                  <div className="relative">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <FadeIn>
              <Link to="/register" className="btn-primary">
                Get Started Now
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-2/3">
              <FadeIn>
                <h2 className="text-3xl font-bold sm:text-4xl mb-4">
                  Ready to transform your lab equipment management?
                </h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-lg text-primary-foreground/80">
                  Join universities and research labs that have simplified their equipment management process.
                </p>
              </FadeIn>
            </div>
            
            <div className="lg:w-1/3 flex justify-center lg:justify-end">
              <FadeIn delay={200}>
                <Link to="/register" className="btn-secondary bg-white text-primary hover:bg-white/90">
                  Create Free Account
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
