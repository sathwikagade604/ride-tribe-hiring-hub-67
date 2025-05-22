
import React from 'react';
import { Button } from '@/components/ui/button';

const SafetySection = () => {
  return (
    <section className="py-16 bg-white" id="safety">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark">Safety is Our Priority</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Advanced protections and features to keep both drivers and passengers safe
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
              <div className="w-6 h-6 rounded-full bg-brand-primary"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Driver Verification</h3>
            <p className="text-gray-600 mb-4">
              Multi-step ID authentication process ensures all drivers are properly verified before accepting rides.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Identity verification includes:</div>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Background checks</li>
                <li>• License verification</li>
                <li>• Facial recognition</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-full bg-brand-secondary/10 flex items-center justify-center mb-4">
              <div className="w-6 h-6 rounded-full bg-brand-secondary"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Monitoring</h3>
            <p className="text-gray-600 mb-4">
              Share your trip details with trusted contacts who can follow your journey in real-time.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Monitoring features:</div>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Live location tracking</li>
                <li>• Route deviation alerts</li>
                <li>• Estimated arrival updates</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
              <div className="w-6 h-6 rounded-full bg-brand-accent"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Fraud Detection</h3>
            <p className="text-gray-600 mb-4">
              AI-powered systems monitor suspicious activities and patterns to prevent fraud and ensure account security.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">Protection against:</div>
              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                <li>• Payment fraud</li>
                <li>• Account takeovers</li>
                <li>• Suspicious behavior</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-brand-light rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-accent rounded-full opacity-10 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-brand-dark mb-2">Emergency Ride Insurance</h3>
              <p className="text-gray-700">
                Every ride includes protection in case of accidents or disruptions. Our 24/7 support team is always ready to help.
              </p>
            </div>
            <div>
              <Button className="btn-primary">Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
