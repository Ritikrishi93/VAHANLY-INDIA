import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark border-t border-gray-800 mt-20">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <div className="relative w-8 h-8 flex items-center justify-center bg-brand-primary rounded-full mr-3">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="self-center text-2xl font-bold whitespace-nowrap text-white">VAHANLY</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs text-sm">
                Simplifying the journey to your next ride. Search, compare, and buy with confidence across India.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Discover</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><a href="#/cars" className="hover:text-brand-primary">Cars</a></li>
                <li className="mb-4"><a href="#/bikes" className="hover:text-brand-primary">Bikes</a></li>
                <li className="mb-4"><a href="#/ev" className="hover:text-brand-primary">Electric Vehicles</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Tools</h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4"><a href="#/compare" className="hover:text-brand-primary">Compare</a></li>
                <li className="mb-4"><a href="#/emi-calculator" className="hover:text-brand-primary">EMI Calculator</a></li>
                <li className="mb-4"><a href="#/contact" className="hover:text-brand-primary">Find Dealers</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">Contact</h2>
              <ul className="text-gray-400 font-medium text-sm">
                <li className="mb-4 flex items-center"><MapPin className="w-4 h-4 mr-2"/> Bhubaneswar, India</li>
                <li className="mb-4 flex items-center"><Mail className="w-4 h-4 mr-2"/> support@vahanly.in</li>
                <li className="flex items-center"><Phone className="w-4 h-4 mr-2"/> +91 98765 43210</li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-800 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">© 2024 VAHANLY™. All Rights Reserved.</span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a href="#" className="text-gray-500 hover:text-white"><Facebook className="w-5 h-5"/></a>
            <a href="#" className="text-gray-500 hover:text-white"><Twitter className="w-5 h-5"/></a>
            <a href="#" className="text-gray-500 hover:text-white"><Instagram className="w-5 h-5"/></a>
            <a href="#" className="text-gray-500 hover:text-white"><Linkedin className="w-5 h-5"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;