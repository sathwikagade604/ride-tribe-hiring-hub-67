
import { useState } from 'react';
import { Driver } from '@/data/mockDrivers';
import { RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { LoginFormValues } from '@/schemas/loginFormSchema';
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

  // Handle login
  const handleLogin = (data: LoginFormValues) => {
    if (data.username && data.password) {
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

  // Handle logout
  const handleLogout = () => {
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
    handleLogout,
    handleDriverSelect,
    setActiveTab
  };
}
