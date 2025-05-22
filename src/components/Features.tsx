
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const featuresData = [
  {
    title: "Benefits for Drivers",
    description: "Choose between commission-based rides or subscription models for predictable income, plus access to fuel and maintenance discounts.",
    icon: "💼",
  },
  {
    title: "Enhanced Safety",
    description: "SOS emergency assistance, real-time trip monitoring, and multi-step driver verification keep everyone protected.",
    icon: "🛡️",
  },
  {
    title: "AI-Powered Experience",
    description: "Intelligent route optimization for drivers and predictive pricing insights for passengers make every ride efficient.",
    icon: "🤖",
  },
  {
    title: "Ride Sharing Options",
    description: "Split fares with others traveling in the same direction, reducing costs and environmental impact.",
    icon: "🚗",
  },
  {
    title: "Transparent Pricing",
    description: "Clear fare calculations and commission structures so everyone knows exactly what to expect.",
    icon: "💰",
  },
  {
    title: "Rewards & Perks",
    description: "Loyalty programs for both drivers and riders with redeemable points and tiered benefits.",
    icon: "🏆",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark">Why Choose Our Platform</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We're reinventing ride-sharing with features that benefit both drivers and passengers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card key={index} className="feature-card border-t-4 border-t-brand-primary animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
