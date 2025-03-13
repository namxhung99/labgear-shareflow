
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!phoneNumber || !password) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Thành công",
        description: "Bạn đã đăng nhập thành công",
      });
      navigate('/dashboard');
    }, 1500);
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 15 characters
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value.slice(0, 15));
  };

  return (
    <div className="glass-panel p-8 w-full max-w-md mx-auto">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-2xl font-bold">Chào mừng trở lại</h1>
        <p className="text-muted-foreground">Đăng nhập vào tài khoản để tiếp tục</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium">
            Số điện thoại
          </label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Nhập số điện thoại của bạn"
            className="input-field"
            disabled={isLoading}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Mật khẩu
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu của bạn"
              className="input-field pr-10"
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            disabled={isLoading}
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-muted-foreground">
            Ghi nhớ đăng nhập
          </label>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Đang đăng nhập...
            </>
          ) : (
            <>
              Đăng nhập
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Tạo tài khoản mới
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
