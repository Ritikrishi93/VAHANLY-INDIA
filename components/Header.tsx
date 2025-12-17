
import React, { useState } from 'react';
// Fix: Use namespaced import to bypass "no exported member" compiler errors in this environment
import * as ReactRouterDOM from 'react-router-dom';
const { Link, useLocation } = ReactRouterDOM as any;
import { Menu, X, Car, Bike, Zap } from 'lucide-react';
// Fix: Cast motion to any to bypass "property does not exist" errors on motion components
import { motion as motion_base, AnimatePresence } from 'framer-motion';
const motion = motion_base as any;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-800 bg-black">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative w-8 h-8 flex items-center justify-center bg-brand-primary rounded-full">
                <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tight">VAHANLY</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to="/contact">
              <button type="button" className="text-white bg-brand-primary hover:bg-brand-secondary focus:ring-4 focus:outline-none focus:ring-blue-900 font-medium rounded-lg text-sm px-4 py-2 text-center transition-colors">
                Dealer Login
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none"
            >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X /> : <Menu />}
            </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            <li>
              <Link to="/cars" className={`block py-2 px-3 md:p-0 ${isActive('/cars') ? 'text-brand-primary' : 'text-gray-300 hover:text-white'} transition-colors`}>Cars</Link>
            </li>
            <li>
              <Link to="/bikes" className={`block py-2 px-3 md:p-0 ${isActive('/bikes') ? 'text-brand-primary' : 'text-gray-300 hover:text-white'} transition-colors`}>Bikes</Link>
            </li>
            <li>
              <Link to="/ev" className={`block py-2 px-3 md:p-0 ${isActive('/ev') ? 'text-brand-primary' : 'text-gray-300 hover:text-white'} transition-colors`}>Electric</Link>
            </li>
            <li>
              <Link to="/compare" className={`block py-2 px-3 md:p-0 ${isActive('/compare') ? 'text-brand-primary' : 'text-gray-300 hover:text-white'} transition-colors`}>Compare</Link>
            </li>
            <li>
              <Link to="/emi-calculator" className={`block py-2 px-3 md:p-0 ${isActive('/emi-calculator') ? 'text-brand-primary' : 'text-gray-300 hover:text-white'} transition-colors`}>EMI Calculator</Link>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden bg-gray-900 border-b border-gray-800 overflow-hidden"
            >
                <ul className="flex flex-col p-4 font-medium space-y-4">
                    <li>
                        <Link to="/cars" onClick={() => setIsOpen(false)} className="flex items-center text-gray-300 hover:text-brand-primary">
                            <Car className="w-5 h-5 mr-2" /> Cars
                        </Link>
                    </li>
                    <li>
                        <Link to="/bikes" onClick={() => setIsOpen(false)} className="flex items-center text-gray-300 hover:text-brand-primary">
                            <Bike className="w-5 h-5 mr-2" /> Bikes
                        </Link>
                    </li>
                    <li>
                        <Link to="/ev" onClick={() => setIsOpen(false)} className="flex items-center text-gray-300 hover:text-brand-primary">
                            <Zap className="w-5 h-5 mr-2" /> Electric
                        </Link>
                    </li>
                     <li>
                        <Link to="/compare" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-brand-primary">Compare</Link>
                    </li>
                     <li>
                        <Link to="/emi-calculator" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-brand-primary">EMI Calculator</Link>
                    </li>
                </ul>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
