
import React from 'react';
import { Button } from '@/components/ui/button';

const RidersSection = () => {
  return (
    <section className="py-16 bg-gray-50" id="riders">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 order-2 md:order-1 animate-fade-in">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">The Perfect Ride, Every Time</h2>
            <p className="text-gray-700 mb-6">
              Experience a new level of comfort, safety, and convenience with our passenger-focused features:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Personalized ride experience</span>
                  <p className="text-gray-600 text-sm">Set preferences for music, temperature, and conversation</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Advanced ride sharing</span>
                  <p className="text-gray-600 text-sm">Split fares with others on similar routes</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Live trip monitoring</span>
                  <p className="text-gray-600 text-sm">Share your journey with trusted contacts in real-time</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-secondary flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Emergency assistance</span>
                  <p className="text-gray-600 text-sm">One-touch SOS button for immediate help when needed</p>
                </div>
              </li>
            </ul>
            <Button className="btn-secondary">Download App</Button>
          </div>
          
          <div className="md:w-1/2 md:pl-8 order-1 md:order-2">
            <div className="bg-white rounded-xl p-6 shadow-lg relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-brand-secondary rounded-full opacity-10 blur-3xl"></div>
              
              <div className="bg-brand-light rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-2">Your Preferences</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Temperature</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs px-2 py-1 bg-brand-primary text-white rounded">Cool</span>
                      <span className="text-xs px-2 py-1 bg-white text-gray-500 rounded border">Warm</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Music</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs px-2 py-1 bg-white text-gray-500 rounded border">On</span>
                      <span className="text-xs px-2 py-1 bg-brand-primary text-white rounded">Off</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversation</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs px-2 py-1 bg-white text-gray-500 rounded border">Chatty</span>
                      <span className="text-xs px-2 py-1 bg-brand-primary text-white rounded">Quiet</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-brand-secondary flex items-center justify-center text-white">
                      <span className="text-sm font-bold">RR</span>
                    </div>
                    <div>
                      <div className="font-medium">Ride Sharing</div>
                      <div className="text-xs text-gray-500">3 people • 15% savings</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span>Standard fare: $18.75</span>
                    <span className="font-medium text-brand-primary">You pay: $15.94</span>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Emergency Support</div>
                    <Button variant="destructive" size="sm" className="text-sm">SOS</Button>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">24/7 emergency assistance with one tap</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RidersSection;
