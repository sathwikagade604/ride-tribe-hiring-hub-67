
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SafetySection from '../components/SafetySection';

const SafetyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-brand-accent text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Safety Features</h1>
            <p className="text-xl max-w-2xl">
              We prioritize the safety of both our drivers and passengers with industry-leading features.
            </p>
          </div>
        </div>
        
        <SafetySection />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How are drivers verified?</h3>
                <p className="text-gray-700">
                  All drivers undergo a comprehensive verification process including background checks, license verification, and facial recognition to ensure they are who they claim to be.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What happens in an emergency?</h3>
                <p className="text-gray-700">
                  Our app includes an SOS button that immediately alerts our safety team and shares your location with emergency services if needed. We also provide ride insurance for added protection.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">How does trip sharing work?</h3>
                <p className="text-gray-700">
                  You can share your trip details and live location with trusted contacts who can follow your journey in real-time, providing an extra layer of security during your ride.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">What fraud detection measures are in place?</h3>
                <p className="text-gray-700">
                  Our AI-powered systems continuously monitor for suspicious activities, unusual patterns, and potential fraud attempts to keep both drivers and passengers protected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SafetyPage;
