
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageTitle from '../PageTitle';
import { describe, it, expect, vi } from 'vitest';

describe('PageTitle', () => {
  it('renders the title correctly', () => {
    render(<PageTitle title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('sets document title and meta description', () => {
    const appendChildMock = vi.fn();
    const removeChildMock = vi.fn();
    
    // Mock document properties
    const originalDocumentTitle = document.title;
    const originalHead = document.head;
    
    Object.defineProperty(document, 'title', {
      configurable: true,
      get: () => originalDocumentTitle,
      set: vi.fn()
    });
    
    Object.defineProperty(document, 'head', {
      configurable: true,
      get: () => ({
        appendChild: appendChildMock,
        removeChild: removeChildMock
      })
    });
    
    const { unmount } = render(<PageTitle title="Test Title" description="Test Description" />);
    
    expect(document.title).toBe("Test Title");
    expect(appendChildMock).toHaveBeenCalled();
    
    unmount();
    
    expect(removeChildMock).toHaveBeenCalled();
    
    // Restore original document properties
    Object.defineProperty(document, 'title', {
      configurable: true,
      get: () => originalDocumentTitle,
      set: (v) => { originalDocumentTitle = v; }
    });
    
    Object.defineProperty(document, 'head', {
      configurable: true,
      value: originalHead
    });
  });
});
