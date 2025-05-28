
import { useState, useEffect } from 'react';
import { Driver } from '@/data/mockDrivers';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { LoginFormValues } from '@/schemas/loginFormSchema';
import { SignupFormValues } from '@/schemas/signupFormSchema';
import { toast } from '@/components/ui/sonner';
import { roleAccessLevels } from '@/constants/roleAccessLevels';

export interface AuthState {
  isLoggedIn: boolean;
  role: RoleKey | '';
  subRole: SubRoleKey | '';
  username: string;
  selectedDriver: Driver | null;
  activeTab: string;
}

export function useAuthState() {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    role: '',
    subRole: '',
    username: '',
    selectedDriver: null,
    activeTab: 'general'
  });

  // Check localStorage on mount for persistence
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    const storedRole = localStorage.getItem('userRole') as RoleKey || '';
    const storedSubRole = localStorage.getItem('userSubRole') || '';

    if (isAuthenticated && storedUsername) {
      setAuthState(prev => ({
        ...prev,
        isLoggedIn: true,
        username: storedUsername,
        role: storedRole,
        subRole: storedSubRole
      }));
    }
  }, []);

  // Handle login
  const handleLogin = (data: LoginFormValues) => {
    if (data.username && data.password) {
      // Store in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', data.username);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userSubRole', data.subRole || '');

      setAuthState({
        ...authState,
        isLoggedIn: true,
        role: data.role as RoleKey,
        subRole: data.subRole || '',
        username: data.username,
      });
      
      // Show success toast
      const roleDisplay = roleAccessLevels[data.role].name;
      const subRoleDisplay = data.subRole && roleAccessLevels[data.role].subRoles?.[data.subRole]?.name 
        ? ` (${roleAccessLevels[data.role].subRoles[data.subRole].name})`
        : '';
        
      toast.success(`Logged in successfully as ${roleDisplay}${subRoleDisplay}`);
    }
  };

  // Handle signup
  const handleSignup = (data: SignupFormValues) => {
    if (data.username && data.email && data.password) {
      // Store in localStorage for persistence
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', data.username);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userSubRole', data.subRole || '');

      setAuthState({
        ...authState,
        isLoggedIn: true,
        role: data.role as RoleKey,
        subRole: data.subRole || '',
        username: data.username,
      });
      
      // Show success toast
      const roleDisplay = roleAccessLevels[data.role].name;
      const subRoleDisplay = data.subRole && roleAccessLevels[data.role].subRoles?.[data.subRole]?.name 
        ? ` (${roleAccessLevels[data.role].subRoles[data.subRole].name})`
        : '';
        
      toast.success(`Account created successfully! Welcome ${data.username} as ${roleDisplay}${subRoleDisplay}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userSubRole');

    setAuthState({
      isLoggedIn: false,
      role: '',
      subRole: '',
      username: '',
      selectedDriver: null,
      activeTab: 'general'
    });
    
    toast.info('Logged out successfully');
  };
  
  // Handle driver selection
  const handleDriverSelect = (driver: Driver) => {
    setAuthState({
      ...authState,
      selectedDriver: driver,
      activeTab: 'driverDetail'
    });
  };

  // Handle tab change
  const setActiveTab = (tab: string) => {
    setAuthState({
      ...authState,
      activeTab: tab
    });
  };

  return {
    ...authState,
    handleLogin,
    handleSignup,
    handleLogout,
    handleDriverSelect,
    setActiveTab
  };
}
