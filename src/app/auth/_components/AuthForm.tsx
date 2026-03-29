'use client';

import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/app/_components/input';
import { Button } from '@/app/_components/button';
import { useState } from 'react';
import { Mode } from '@/app/_libs/enums';
import { AuthData } from '@/app/_libs/types';
import { useRouter } from 'next/navigation';
import { LOGIN, POSTS } from '@/site-settings/navigations';
import { authUser } from '@/app/_libs/utils';
import { ErrorState } from '@/app/_components/errorState';

export const AuthForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [mode, setMode] = useState<string>(Mode.Login);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = () => {
    const users = localStorage.getItem('users');
    if (users) {
      const formatUsers: AuthData[] = JSON.parse(users);
      const user = formatUsers.filter(
        (item) =>
          item.email === formData.email && item.password === formData.password
      );
      if (!user) {
        throw new Error('Invalid user credentials');
      }
      authUser();
    } else {
      throw new Error('User not found');
    }
  };

  const handleSignup = () => {
    const users = localStorage.getItem('users');
    if (users) {
      const formatUsers: AuthData[] = JSON.parse(users);
      const user = formatUsers.filter(
        (item) =>
          item.email === formData.email && item.password === formData.password
      );
      if (user.length > 0) {
        throw new Error('User already exist');
      } else {
        localStorage.setItem(
          'users',
          JSON.stringify([...formatUsers, formData])
        );
        authUser();
      }
    } else {
      localStorage.setItem('users', JSON.stringify([formData]));
      authUser();
    }
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    try {
      if (mode === 'login') {
        handleLogin();
        setIsLoading(false);
      } else {
        handleSignup();
        setIsLoading(false);
      }
      router.push(POSTS.href);
    } catch (error) {
      setIsLoading(false);
      const err = error as Error;
      setErrors({ message: err.message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const toggleMode = () => {
    const pageMode = mode === 'login' ? 'signup' : 'login';
    setMode(pageMode);
    router.replace(`${LOGIN.href}?mode=${pageMode}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 rounded-xl border border-slate-800 p-8 shadow-2xl space-y-6"
      >
        {errors.message && <ErrorState message={errors.message} />}
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-white mb-2"
          >
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`h-11 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-white mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={`h-11 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                errors.password ? 'border-red-500 focus:ring-red-500' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field (Signup only) */}
        {mode === 'signup' && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-white mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`h-11 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Remember Me (Login only) */}
        {mode === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-purple-600 border-slate-700 rounded bg-slate-800"
              />
              <span className="text-sm text-slate-400">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm text-purple-400 hover:text-purple-300 font-medium"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {/* Terms Checkbox (Signup only) */}
        {mode === 'signup' && (
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`w-4 h-4 mt-0.5 rounded cursor-pointer bg-slate-800 border-slate-700 ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
              />
              <span className="text-sm text-slate-400">
                I agree to the{' '}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm mt-1">{errors.agreeToTerms}</p>
            )}
          </div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
            <p className="text-red-400 text-sm">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-11"
        >
          {isLoading
            ? 'Please wait...'
            : mode === 'login'
            ? 'Sign In'
            : 'Create Account'}
        </Button>
      </form>
      <div className="text-center mt-8">
        <p className="text-slate-700 dark:text-slate-400">
          {mode === 'login'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            onClick={toggleMode}
            className="text-purple-400 hover:text-purple-300 font-semibold"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </>
  );
};
