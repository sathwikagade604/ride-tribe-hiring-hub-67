
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from '@/components/ui/sonner';
import { mockDrivers, Driver } from '@/data/mockDrivers';
import { roleAccessLevels, RoleKey, SubRoleKey } from '@/constants/roleAccessLevels';
import { LoginFormValues } from '@/schemas/loginFormSchema';
import LoginSection from '@/components/access/LoginSection';
import AuthenticatedSection from '@/components/access/AuthenticatedSection';

const Access = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<RoleKey | ''>('');
  const [subRole, setSubRole] = useState<SubRoleKey | ''>('');
  const [username, setUsername] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    document.title = "Access RideShare India | Quick Links";
    
    // Add meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = "Quick access links to all RideShare India services and features.";
    document.head.appendChild(metaDescription);
    
    // Cleanup function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  // Handle login
  const handleLogin = (data: LoginFormValues) => {
    // This is a mock authentication - in a real app you'd validate with a backend
    if (data.username && data.password) {
      setIsLoggedIn(true);
      setRole(data.role as RoleKey);
      setSubRole(data.subRole || '');
      setUsername(data.username);
      
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
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    setSubRole('');
    setSelectedDriver(null);
    setActiveTab('general');
    
    toast.info('Logged out successfully');
  };
  
  // Handle driver selection
  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setActiveTab('driverDetail');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Access RideShare India</h1>
          
          {!isLoggedIn ? (
            <LoginSection onLogin={handleLogin} />
          ) : (
            <AuthenticatedSection 
              role={role as RoleKey}
              username={username}
              subRole={subRole}
              onLogout={handleLogout}
              selectedDriver={selectedDriver}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              drivers={mockDrivers}
              onDriverSelect={handleDriverSelect}
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Access;
