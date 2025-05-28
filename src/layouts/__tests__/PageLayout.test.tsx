
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PageLayout from '../PageLayout';
import { describe, it, expect, vi } from 'vitest';

// Mock the Navbar and Footer components
vi.mock('@/components/Navbar', () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Mock Footer</div>
}));

describe('PageLayout', () => {
  it('renders navbar, main content, and footer', () => {
    render(
      <BrowserRouter>
        <PageLayout>
          <div data-testid="test-content">Test Content</div>
        </PageLayout>
      </BrowserRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
