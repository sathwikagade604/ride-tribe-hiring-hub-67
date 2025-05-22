
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RidersSection from '../components/RidersSection';
import { Button } from '@/components/ui/button';

const RidersPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-brand-secondary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Ride With Us</h1>
            <p className="text-xl max-w-2xl">
              Experience comfort, safety, and convenience with our passenger-focused features.
            </p>
          </div>
        </div>
        
        <RidersSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">🚗</div>
                <h3 className="text-xl font-semibold mb-2">Ride Sharing</h3>
                <p className="text-gray-600 mb-4">
                  Save up to 25% by sharing your ride with others heading in the same direction.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">👑</div>
                <h3 className="text-xl font-semibold mb-2">Loyalty Program</h3>
                <p className="text-gray-600 mb-4">
                  Earn points with every ride that can be redeemed for free trips and exclusive perks.
                </p>
                <Button variant="outline" className="w-full">Join Now</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Download the App</h3>
                <p className="text-gray-600 mb-4">
                  Get the full experience with our mobile app, available for iOS and Android devices.
                </p>
                <Button className="btn-secondary w-full">Download</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RidersPage;
