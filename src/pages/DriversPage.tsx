
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DriversSection from '../components/DriversSection';
import { Button } from '@/components/ui/button';
import { IndianRupee } from 'lucide-react';

const DriversPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Drive With Us | RideShare India</title>
        <meta name="description" content="Join our team of professional drivers across India and enjoy benefits that traditional ride-sharing companies don't offer." />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-brand-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Drive With Us in India</h1>
            <p className="text-xl max-w-2xl">
              Join our team of professional drivers across India and enjoy benefits that traditional ride-sharing companies don't offer.
            </p>
          </div>
        </div>
        
        <DriversSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Earning in <IndianRupee className="inline w-6 h-6" />?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Apply today and become part of our growing network of professional drivers in India.
            </p>
            <Button className="btn-primary text-lg">Apply Now</Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default DriversPage;
