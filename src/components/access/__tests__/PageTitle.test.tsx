
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTitle from '../PageTitle';
import { describe, it, expect } from 'vitest';

describe('PageTitle', () => {
  it('renders the title correctly', () => {
    render(<PageTitle title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
