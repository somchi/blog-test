import { AuthForm } from '@/app/auth/_components/AuthForm';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

describe('Test auth component', () => {
  test('Test signin for is first vibile', () => {
    render(<AuthForm />);
    const signin = screen.getByText('Forgot passwor');
    expect(signin).toBeInTheDocument();
  });

  test('Test the signup is visible', () => {
    render(<AuthForm />);
    const signin = screen.getByText('Sign up');
    fireEvent.click(signin);
    const signup = screen.getByText('Already have an account?');
    expect(signup).toBeInTheDocument();
  });
});
