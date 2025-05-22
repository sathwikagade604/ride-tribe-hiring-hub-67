
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import DriversSection from '../components/DriversSection';
import RidersSection from '../components/RidersSection';
import SafetySection from '../components/SafetySection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
      </Helmet>
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
