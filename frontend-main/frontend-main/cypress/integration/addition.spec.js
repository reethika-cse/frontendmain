import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login component', () => {
  test('renders Sign In by default', () => {
    render(<Login />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  test('renders Sign Up when activated', () => {
    render(<Login />);
    const signUpLink = screen.getByText(/Sign Up/i);
    expect(signUpLink).toBeInTheDocument();

    // Click the Sign Up link
    signUpLink.click();

    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test('submits login form when Sign In button is clicked', async () => {
    // Mock loginUser function
    const loginUser = jest.fn();

    render(<Login loginUser={loginUser} />);
    
    // Fill in email and password
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    // Enter email and password
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password');

    // Click Sign In button
    signInButton.click();

    // Assert loginUser function is called with correct arguments
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password', expect.any(Function));
    });
  });

  test('submits signup form when Sign Up button is clicked', async () => {
    // Mock submitUser function
    const submitUser = jest.fn();

    render(<Login submitUser={submitUser} />);
    
    // Click Sign Up link
    const signUpLink = screen.getByText(/Sign Up/i);
    signUpLink.click();

    // Fill in username, email, and password
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

    // Enter username, email, and password
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password');

    // Click Sign Up button
    signUpButton.click();

    // Assert submitUser function is called with correct arguments
    await waitFor(() => {
      expect(submitUser).toHaveBeenCalledWith('testuser', 'test@example.com', 'password', expect.any(Function));
    });
  });
});
