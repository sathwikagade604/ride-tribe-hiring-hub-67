
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageLayout from '../../layouts/PageLayout';
import { describe, it, expect, vi } from 'vitest';

// Mock child components
vi.mock('@/components/Navbar', () => ({
  default: () => <div data-testid="navbar">Mock Navbar</div>
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Mock Footer</div>
}));

describe('PageLayout', () => {
  it('renders navbar, content and footer', () => {
    render(
      <PageLayout>
        <div data-testid="content">Test Content</div>
      </PageLayout>
    );
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
