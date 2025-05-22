
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DriversSection from '../components/DriversSection';
import RidersSection from '../components/RidersSection';
import SafetySection from '../components/SafetySection';
import Footer from '../components/Footer';

const Index = () => {
  // Set document title using useEffect
  React.useEffect(() => {
    document.title = "RideShare India | Next Generation Ride Sharing";
    
    // Add meta tags
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = "RideShare India offers next-generation ride sharing services with better benefits for both drivers and passengers.";
    document.head.appendChild(metaDescription);
    
    const metaRegion = document.createElement('meta');
    metaRegion.name = 'geo.region';
    metaRegion.content = 'IN';
    document.head.appendChild(metaRegion);
    
    const metaPlacename = document.createElement('meta');
    metaPlacename.name = 'geo.placename';
    metaPlacename.content = 'India';
    document.head.appendChild(metaPlacename);
    
    // Cleanup function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(metaRegion);
      document.head.removeChild(metaPlacename);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <DriversSection />
        <RidersSection />
        <SafetySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
