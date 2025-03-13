
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password validation
  const hasMinLength = formData.password.length >= 8;
  const hasNumber = /\d/.test(formData.password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== '';

  const passwordStrength = 
    hasMinLength && hasNumber && hasSpecialChar 
      ? 'strong' 
      : (hasMinLength && (hasNumber || hasSpecialChar)) 
        ? 'medium' 
        : 'weak';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      // Only allow numbers and limit to 15 characters
      const formattedValue = value.replace(/\D/g, '').slice(0, 15);
      setFormData({ ...formData, [name]: formattedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const startResendCountdown = () => {
    setCountdown(30);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      startResendCountdown();
      toast({
        title: "OTP Sent",
        description: "We've sent a verification code to your phone",
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast({
        title: "Success",
        description: "Phone number verified successfully",
      });
    }, 1500);
  };

  const handleResendOtp = () => {
    startResendCountdown();
    toast({
      title: "OTP Resent",
      description: "We've sent a new verification code to your phone",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (!passwordsMatch) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!hasMinLength || !hasNumber || !hasSpecialChar) {
      toast({
        title: "Error",
        description: "Password does not meet the requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Your account has been successfully created",
      });
      navigate('/dashboard');
    }, 1500);
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-2xl font-bold">Create an Account</h1>
              <p className="text-muted-foreground">Enter your details to get started</p>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="input-field"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="input-field"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="input-field"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <button
                type="button"
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={handleSendOtp}
                disabled={isLoading || !formData.fullName || !formData.phoneNumber || !formData.email}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        );
      
      case 2:
        return (
          <>
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-2xl font-bold">Verify Your Phone</h1>
              <p className="text-muted-foreground">
                We've sent a 6-digit code to {formData.phoneNumber}
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="otp-0" className="text-sm font-medium">
                  Enter Verification Code
                </label>
                <div className="flex justify-between items-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="input-field w-12 h-14 text-center text-lg"
                      maxLength={1}
                      disabled={isLoading}
                      required
                    />
                  ))}
                </div>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resend code in <span className="font-medium">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="text-sm text-primary hover:underline"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                    >
                      Resend verification code
                    </button>
                  )}
                </div>
              </div>
              
              <button
                type="button"
                className="btn-primary w-full flex items-center justify-center gap-2"
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.join('').length !== 6}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        );
      
      case 3:
        return (
          <>
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-2xl font-bold">Create Password</h1>
              <p className="text-muted-foreground">Set a secure password for your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    className="input-field pr-10"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password strength meter */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength === 'strong'
                            ? 'bg-green-500 w-full'
                            : passwordStrength === 'medium'
                              ? 'bg-amber-500 w-2/3'
                              : 'bg-red-500 w-1/3'
                        }`}
                      />
                    </div>
                    
                    <ul className="mt-3 space-y-1 text-sm">
                      <li className="flex items-center gap-2">
                        {hasMinLength ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-muted-foreground" />
                        )}
                        <span className={hasMinLength ? 'text-foreground' : 'text-muted-foreground'}>
                          At least 8 characters
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        {hasNumber ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-muted-foreground" />
                        )}
                        <span className={hasNumber ? 'text-foreground' : 'text-muted-foreground'}>
                          At least one number
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        {hasSpecialChar ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-muted-foreground" />
                        )}
                        <span className={hasSpecialChar ? 'text-foreground' : 'text-muted-foreground'}>
                          At least one special character
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`input-field ${
                    formData.confirmPassword && !passwordsMatch
                      ? 'border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                  disabled={isLoading}
                  required
                />
                
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2"
                disabled={isLoading || !passwordsMatch || !hasMinLength || !hasNumber || !hasSpecialChar}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel p-8 w-full max-w-md mx-auto">
      {renderStep()}
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
