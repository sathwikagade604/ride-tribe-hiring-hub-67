
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Access from '../Access';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginFormValues } from '@/schemas/loginFormSchema';

// Mock necessary components
vi.mock('@/components/Navbar', () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Mock Footer</div>
}));

vi.mock('@/components/access/PageTitle', () => ({
  default: ({ title }: { title: string }) => <h1 data-testid="page-title">{title}</h1>
}));

vi.mock('@/components/access/LoginSection', () => ({
  default: ({ onLogin }: { onLogin: (data: LoginFormValues) => void }) => (
    <div data-testid="login-section">
      <button 
        data-testid="login-button" 
        onClick={() => onLogin({ username: 'testuser', password: 'password', role: 'employee' })}
      >
        Mock Login
      </button>
    </div>
  )
}));

vi.mock('@/components/access/AuthenticatedSection', () => ({
  default: ({ role, username, onLogout }: { 
    role: string, 
    username: string, 
    onLogout: () => void 
  }) => (
    <div data-testid="authenticated-section">
      Logged in as {username} with role {role}
      <button data-testid="logout-button" onClick={onLogout}>Logout</button>
    </div>
  )
}));

// Mock toast
vi.mock('@/components/ui/sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn()
  }
}));

describe('Access Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the login section when not logged in', () => {
    render(
      <BrowserRouter>
        <Access />
      </BrowserRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('login-section')).toBeInTheDocument();
    expect(screen.queryByTestId('authenticated-section')).not.toBeInTheDocument();
  });

  it('handles login correctly', async () => {
    render(
      <BrowserRouter>
        <Access />
      </BrowserRouter>
    );

    // Click login button
    fireEvent.click(screen.getByTestId('login-button'));

    // Check that we're now logged in
    await waitFor(() => {
      expect(screen.getByTestId('authenticated-section')).toBeInTheDocument();
      expect(screen.queryByTestId('login-section')).not.toBeInTheDocument();
      expect(screen.getByText('Logged in as testuser with role employee')).toBeInTheDocument();
    });
  });

  it('handles logout correctly', async () => {
    render(
      <BrowserRouter>
        <Access />
      </BrowserRouter>
    );

    // Login first
    fireEvent.click(screen.getByTestId('login-button'));

    // Now log out
    await waitFor(() => {
      expect(screen.getByTestId('authenticated-section')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByTestId('logout-button'));

    // Check that we're logged out
    await waitFor(() => {
      expect(screen.queryByTestId('authenticated-section')).not.toBeInTheDocument();
      expect(screen.getByTestId('login-section')).toBeInTheDocument();
    });
  });
});
