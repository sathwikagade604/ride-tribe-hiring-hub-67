
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-bold text-2xl text-brand-primary">RideShare</div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/drivers" className="nav-link">For Drivers</Link>
          <Link to="/riders" className="nav-link">For Riders</Link>
          <Link to="/safety" className="nav-link">Safety</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="btn-outline">Log In</Button>
          <Button className="btn-primary">Sign Up</Button>
        </div>
        
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 absolute w-full border-b animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/drivers" className="nav-link" onClick={() => setIsMenuOpen(false)}>For Drivers</Link>
            <Link to="/riders" className="nav-link" onClick={() => setIsMenuOpen(false)}>For Riders</Link>
            <Link to="/safety" className="nav-link" onClick={() => setIsMenuOpen(false)}>Safety</Link>
            <div className="flex gap-2 mt-2">
              <Button variant="outline" className="btn-outline flex-1">Log In</Button>
              <Button className="btn-primary flex-1">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
