
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const Access = () => {
  React.useEffect(() => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Access RideShare India</h1>
          
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold mb-4">Main Sections</h2>
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
            
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
              <div className="space-y-4">
                <Button className="w-full text-lg justify-start h-14">
                  📱 Download Mobile App
                </Button>
                <Button variant="secondary" className="w-full text-lg justify-start h-14">
                  🔑 Partner Login
                </Button>
                <Button variant="outline" className="w-full text-lg justify-start h-14">
                  📞 Contact Support
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-medium mb-3">Need help?</h3>
              <p className="text-gray-600">
                If you need assistance accessing any part of RideShare India services,
                please contact our support team at support@rideshare.example
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Access;
