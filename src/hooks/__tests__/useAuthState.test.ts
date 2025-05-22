
import { renderHook, act } from '@testing-library/react';
import { useAuthState } from '../useAuthState';
import { describe, it, expect, vi } from 'vitest';
import { toast } from '@/components/ui/sonner';
import { mockDrivers } from '@/data/mockDrivers';

// Mock toast
vi.mock('@/components/ui/sonner', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn()
  }
}));

describe('useAuthState', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAuthState());
    
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.role).toBe('');
    expect(result.current.subRole).toBe('');
    expect(result.current.username).toBe('');
    expect(result.current.selectedDriver).toBe(null);
    expect(result.current.activeTab).toBe('general');
  });

  it('should handle login correctly', () => {
    const { result } = renderHook(() => useAuthState());
    
    act(() => {
      result.current.handleLogin({
        username: 'testuser',
        password: 'password',
        role: 'employee'
      });
    });
    
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.role).toBe('employee');
    expect(result.current.username).toBe('testuser');
    expect(toast.success).toHaveBeenCalled();
  });

  it('should handle logout correctly', () => {
    const { result } = renderHook(() => useAuthState());
    
    // Login first
    act(() => {
      result.current.handleLogin({
        username: 'testuser',
        password: 'password',
        role: 'employee'
      });
    });
    
    // Then logout
    act(() => {
      result.current.handleLogout();
    });
    
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.role).toBe('');
    expect(result.current.username).toBe('');
    expect(toast.info).toHaveBeenCalledWith('Logged out successfully');
  });

  it('should handle driver selection correctly', () => {
    const { result } = renderHook(() => useAuthState());
    const driver = mockDrivers[0];
    
    act(() => {
      result.current.handleDriverSelect(driver);
    });
    
    expect(result.current.selectedDriver).toBe(driver);
    expect(result.current.activeTab).toBe('driverDetail');
  });

  it('should handle tab change correctly', () => {
    const { result } = renderHook(() => useAuthState());
    
    act(() => {
      result.current.setActiveTab('newTab');
    });
    
    expect(result.current.activeTab).toBe('newTab');
  });
});
