
import React from 'react';
import { Button } from '@/components/ui/button';

const DriversSection = () => {
  return (
    <section className="py-16 bg-white" id="drivers">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="bg-brand-light rounded-xl p-6 relative">
              <div className="absolute -top-8 -left-8 w-64 h-64 bg-brand-accent rounded-full opacity-10 blur-3xl"></div>
              <div className="bg-white rounded-lg shadow-lg p-5 relative z-10 mb-5">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <div className="font-medium text-lg">This Week's Earnings</div>
                  <div className="text-brand-accent font-bold">$872.50</div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Rides Completed</span>
                    <span className="font-medium">32</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Hours Online</span>
                    <span className="font-medium">28.5</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Average per Hour</span>
                    <span className="font-medium">$30.61</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-white rounded-lg p-4 shadow-md flex-1 text-center">
                  <div className="text-xs text-gray-500">Fuel Discount</div>
                  <div className="text-lg font-bold text-brand-primary">12%</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md flex-1 text-center">
                  <div className="text-xs text-gray-500">Maintenance</div>
                  <div className="text-lg font-bold text-brand-primary">15%</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md flex-1 text-center">
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="text-lg font-bold text-brand-primary">4.9</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-brand-dark mb-4">Drive With Us</h2>
            <p className="text-gray-700 mb-6">
              Join our team of professional drivers and enjoy benefits that traditional ride-sharing companies don't offer:
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Flexible earning models</span>
                  <p className="text-gray-600 text-sm">Choose between commission-based or subscription models</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Performance rewards</span>
                  <p className="text-gray-600 text-sm">Earn bonuses and priority ride assignments</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">AI route optimization</span>
                  <p className="text-gray-600 text-sm">Get faster routes and reduce fuel consumption</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center text-white flex-shrink-0">✓</div>
                <div>
                  <span className="font-medium">Maintenance benefits</span>
                  <p className="text-gray-600 text-sm">Discounted repairs and maintenance at partner locations</p>
                </div>
              </li>
            </ul>
            <Button className="btn-primary">Apply to Drive</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriversSection;
