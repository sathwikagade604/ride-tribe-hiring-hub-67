
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-brand-light to-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            The Next Generation of <span className="text-brand-primary">Ride Sharing</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Connecting passengers to drivers with benefits that matter.
            Better earnings for drivers, better experiences for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary text-lg">Become a Driver</Button>
            <Button variant="outline" className="btn-outline text-lg">Request a Ride</Button>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-brand-accent rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-brand-primary rounded-full opacity-20 blur-2xl"></div>
            <div className="bg-white rounded-xl p-4 shadow-xl relative z-10">
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary"></div>
                  </div>
                  <div>
                    <div className="font-medium">Your ride is on the way</div>
                    <div className="text-sm text-gray-500">Arriving in 3 minutes</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="text-sm">Current location</div>
                </div>
                <div className="w-0.5 h-6 bg-gray-300 ml-1"></div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                  <div className="text-sm">Destination</div>
                </div>
              </div>
              <div className="mt-4 bg-brand-light rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">Standard Ride</div>
                    <div className="text-xs text-gray-500">Toyota Camry • 3 min away</div>
                  </div>
                  <div className="font-medium">$12.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
