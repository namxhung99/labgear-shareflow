
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has a preferred theme
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Thiết bị', href: '/equipment' },
    { name: 'Bảng điều khiển', href: '/dashboard' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-black/50 backdrop-blur-xl shadow-soft' : 'bg-transparent'
      }`}
    >
      <div className="layout-container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex flex-col items-start">
              <span className="text-xl font-display font-bold tracking-tight">LabGear</span>
              <span className="text-xs text-muted-foreground -mt-1">Trang quản lý thiết bị</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link ${location.pathname === link.href ? 'nav-link-active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Chuyển đổi chế độ tối"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login" className="btn-secondary">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn-primary">
                Đăng ký
              </Link>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
                aria-label="Mở menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="glass-panel absolute top-16 left-4 right-4 mt-2 p-4 space-y-4 animate-scale-in">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-4 py-3 rounded-lg ${
                  location.pathname === link.href
                    ? 'bg-secondary/50 text-foreground font-medium'
                    : 'text-foreground/70 hover:bg-secondary/30'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
