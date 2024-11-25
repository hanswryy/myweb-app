import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Login';

// Mock `react-router-dom` hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock the `fetch` API
global.fetch = jest.fn();

describe('Login Component', () => {
  const mockedNavigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockedNavigate);
  });

  test('renders login form correctly', async () => {
    render(
      <Router>
        <Login/>
      </Router>
    );
    
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
});

  test('redirects to home on successful login', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mockToken' }),
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'validuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'validpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/'));
    expect(localStorage.getItem('token')).toBe('mockToken');
  });

  // check if the error message is displayed if the login fails
  test('displays error message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'invaliduser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'invalidpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() =>
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    );
  });
});
