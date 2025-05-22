
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { mockDrivers, Driver } from '@/data/mockDrivers';
import { roleAccessLevels, RoleKey } from '@/constants/roleAccessLevels';
import { LoginFormValues } from '@/schemas/loginFormSchema';

// Import components
import LoginForm from '@/components/access/LoginForm';
import RoleInfo from '@/components/access/RoleInfo';
import EmployeeContent from '@/components/access/EmployeeContent';
import SupportContent from '@/components/access/SupportContent';
import ServiceContent from '@/components/access/ServiceContent';
import ChatContent from '@/components/access/ChatContent';
import QueryContent from '@/components/access/QueryContent';
import TrackingContent from '@/components/access/TrackingContent';
import DriverDetail from '@/components/access/DriverDetail';
import RoleHeader from '@/components/access/RoleHeader';
import AccessPermissionsBanner from '@/components/access/AccessPermissionsBanner';

const Access = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<RoleKey | ''>('');
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
      setUsername(data.username);
      
      // Show success toast
      toast.success(`Logged in successfully as ${roleAccessLevels[data.role].name}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    setSelectedDriver(null);
    setActiveTab('general');
    
    toast.info('Logged out successfully');
  };
  
  // Handle driver selection
  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver);
    setActiveTab('driverDetail');
  };

  // Check if user has a specific permission
  const hasPermission = (permissionName: string): boolean => {
    if (!role || !roleAccessLevels[role]) return false;
    return roleAccessLevels[role].permissions.includes(permissionName);
  };

  // Render role-specific content
  const renderRoleContent = () => {
    switch(role) {
      case 'employee':
        return <EmployeeContent drivers={mockDrivers} onDriverSelect={handleDriverSelect} />;
      case 'support':
        return <SupportContent />;
      case 'service':
        return <ServiceContent />;
      case 'chat':
        return <ChatContent />;
      case 'query':
        return <QueryContent />;
      case 'tracking':
        return <TrackingContent />;
      default:
        return (
          <div className="text-center p-8">
            <p>Unknown role: {role}</p>
            <Button onClick={handleLogout} className="mt-4">Logout</Button>
          </div>
        );
    }
  };

  // Main rendering logic
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Access RideShare India</h1>
          
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <LoginForm onLogin={handleLogin} />
              
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Available Access Roles</h2>
                <div className="space-y-4">
                  {Object.keys(roleAccessLevels).map((key) => (
                    <div key={key} onClick={() => {}}>
                      <RoleInfo roleKey={key as RoleKey} />
                    </div>
                  ))}
                </div>
              </div>
          
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">General Access</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🏠 Home Page
                    </Button>
                  </Link>
                  <Link to="/drivers" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🚗 For Drivers
                    </Button>
                  </Link>
                  <Link to="/riders" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      👤 For Riders
                    </Button>
                  </Link>
                  <Link to="/safety" className="no-underline">
                    <Button variant="outline" className="w-full text-lg justify-start h-14">
                      🛡️ Safety
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <RoleHeader 
                role={role as RoleKey} 
                username={username} 
                onLogout={handleLogout} 
              />
              
              <AccessPermissionsBanner role={role as RoleKey} />
              
              {activeTab === 'general' ? renderRoleContent() : (
                selectedDriver && <DriverDetail driver={selectedDriver} onBack={() => setActiveTab('general')} />
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Access;
