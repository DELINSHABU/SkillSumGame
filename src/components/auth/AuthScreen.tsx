'use client';

import { useState, useCallback } from 'react';
import { useSupabaseProfile, validatePassword } from '@/hooks/useSupabaseProfile';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const { signIn, signUp, signInWithGoogle } = useSupabaseProfile();

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!isLoginMode) {
      const validation = validatePassword(value);
      setPasswordErrors(validation.errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginMode) {
        await signIn(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const validation = validatePassword(password);
        if (!validation.valid) {
          setError('Password does not meet requirements');
          setLoading(false);
          return;
        }
        await signUp(email, password);
      }
      onAuthSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google sign in failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full top-0 sticky z-50 flex items-center justify-center px-6 py-4 bg-background">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">videogame_asset</span>
          <span className="font-headline font-black text-2xl text-primary tracking-tighter">SkillSum 2.0</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow dot-grid flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md">
          {/* Decorative Floating Elements */}
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-tertiary-fixed/40 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-secondary-container/30 rounded-full blur-2xl"></div>

          {/* Glass Panel */}
          <div className="glass-panel relative z-10 p-8 md:p-12 rounded-xl shadow-[0_24px_48px_-12px_rgba(162,55,96,0.12)] border border-outline-variant/15">
            {/* Title */}
            <div className="mb-10 text-center">
              <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-3">
                {isLoginMode ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="text-on-surface-variant font-medium">
                {isLoginMode ? 'Ready to jump back into your growth quest?' : 'Start your mental math journey today!'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-error-container rounded-lg">
                <p className="text-sm text-on-error-container font-medium">{error}</p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary font-bold ml-4">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-low border-transparent focus:border-primary-container focus:ring-0 rounded-lg px-6 py-4 font-body transition-all group-hover:bg-surface-container-lowest outline outline-1 outline-outline-variant/15 focus:outline-primary-container"
                    placeholder="hero@skillsum.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-primary-container">alternate_email</span>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="font-label text-xs uppercase tracking-widest text-primary font-bold ml-4">
                  Password
                </label>
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container-low border-transparent focus:border-primary-container focus:ring-0 rounded-lg px-6 py-4 font-body transition-all group-hover:bg-surface-container-lowest outline outline-1 outline-outline-variant/15 focus:outline-primary-container"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-primary-container">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password (Signup Only) */}
              {!isLoginMode && (
                <div className="space-y-2">
                  <label className="font-label text-xs uppercase tracking-widest text-primary font-bold ml-4">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      className="w-full bg-surface-container-low border-transparent focus:border-primary-container focus:ring-0 rounded-lg px-6 py-4 font-body transition-all group-hover:bg-surface-container-lowest outline outline-1 outline-outline-variant/15 focus:outline-primary-container"
                      placeholder="••••••••"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password Requirements (Signup Only) */}
              {!isLoginMode && passwordErrors.length > 0 && (
                <div className="p-4 bg-surface-container-low rounded-lg">
                  <p className="text-xs font-bold text-error mb-2">Password requirements:</p>
                  <ul className="space-y-1">
                    {passwordErrors.map((err, i) => (
                      <li key={i} className="text-xs text-error flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">close</span>
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Forgot Password (Login Only) */}
              {isLoginMode && (
                <div className="flex justify-end pt-1">
                  <button type="button" className="text-sm font-label text-primary hover:text-primary-container transition-colors font-bold">
                    Forgot Secret?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || (!isLoginMode && passwordErrors.length > 0)}
                className="w-full relative group transform active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-on-primary-container rounded-lg translate-y-1"></div>
                <div className="relative bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-lg py-4 rounded-lg flex items-center justify-center gap-2 group-active:translate-y-1 transition-transform">
                  {loading ? (
                    <span className="material-symbols-outlined animate-spin">sync</span>
                  ) : (
                    <>
                      {isLoginMode ? 'Login' : 'Sign Up'}
                      <span className="material-symbols-outlined text-xl">rocket_launch</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant/30"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.2em] font-label">
                <span className="bg-surface-container-lowest px-4 text-on-surface-variant/60 font-bold">OR</span>
              </div>
            </div>

            {/* Google Sign In */}
            <div className="space-y-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-body font-semibold py-4 rounded-lg hover:bg-surface-container-low transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <img
                  alt="Google Logo"
                  className="w-6 h-6"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSYnYEzE3oPkxqE_CKltu8BXaRRdmAxKg9nGMByBmt6he1f5msr2OKMvnW053pNjcq2QdrvUECg7f_jbag1qUWoDiWjDtF09DlZnE97bfH1fxYdt4pQAhrk5LeWUtEdx24WT-nhY3YXh8-VBnH0PYINStg7MaSrR8g7A1qhy4mA2JrC0hPvBhFC4udJaxpO0xac3-T6FZbaAp5TE92S5nkogyzA22E8CSszy7YPZBgLkdffUdozc7zZluX99ftBDHr6d9GUS-hu9kH"
                />
                Continue with Google
              </button>
            </div>

            {/* Toggle Login/Signup */}
            <div className="mt-10 text-center">
              <p className="font-body text-on-surface-variant font-medium">
                {isLoginMode ? 'New here?' : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setError('');
                    setPasswordErrors([]);
                  }}
                  className="text-primary font-bold hover:underline decoration-primary-container decoration-2 underline-offset-4 ml-1"
                >
                  {isLoginMode ? 'Create an account' : 'Login'}
                </button>
              </p>
            </div>
          </div>

          {/* Bento Preview Hint */}
          <div className="mt-12 flex justify-center gap-6 opacity-40">
            <div className="w-12 h-12 rounded-lg bg-tertiary-container rotate-6 shadow-sm"></div>
            <div className="w-12 h-12 rounded-full bg-secondary rotate-[-12deg] shadow-sm"></div>
            <div className="w-12 h-12 rounded-lg bg-primary-container rotate-12 shadow-sm"></div>
          </div>
        </div>
      </main>

      {/* Background Decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary-container/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-tertiary-container/5 rounded-full blur-[100px]"></div>
      </div>

      <style jsx global>{`
        .dot-grid {
          background-image: radial-gradient(circle, #dbc0c6 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .font-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .font-body {
          font-family: 'Be Vietnam Pro', sans-serif;
        }
        .font-label {
          font-family: 'Space Grotesk', sans-serif;
        }
        .bg-background { background-color: #fff7fa; }
        .text-on-surface { color: #1e1b1d; }
        .text-on-surface-variant { color: #554247; }
        .text-primary { color: #a23760; }
        .text-primary-container { color: #77133f; }
        .text-on-primary-container { color: #ff80ab; }
        .text-on-primary { color: #ffffff; }
        .text-error { color: #ba1a1a; }
        .text-on-error-container { color: #93000a; }
        .bg-surface-container-low { background-color: #f9f2f5; }
        .bg-surface-container-lowest { background-color: #ffffff; }
        .bg-primary-container { background-color: #ff80ab; }
        .bg-secondary-container { background-color: #fd983a; }
        .bg-tertiary-container { background-color: #11bea8; }
        .bg-tertiary-fixed { background-color: #6bf9e1; }
        .bg-error-container { background-color: #ffdad6; }
        .from-primary { --tw-gradient-from: #a23760; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(162, 55, 96, 0)); }
        .to-primary-container { --tw-gradient-to: #ff80ab; }
        .outline-outline-variant\\/15 { outline-color: rgba(219, 192, 198, 0.15); }
        .border-outline-variant\\/15 { border-color: rgba(219, 192, 198, 0.15); }
      `}</style>
    </div>
  );
}