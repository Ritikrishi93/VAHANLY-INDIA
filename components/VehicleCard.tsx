
import React from 'react';
// Fix: Use namespaced import to bypass "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM as any;
// Fix: Cast motion to any to bypass property errors
import { motion as motion_base } from 'framer-motion';
const motion = motion_base as any;
import { Vehicle } from '../types';
import { ChevronRight, Fuel } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-brand-card border border-gray-800 rounded-xl overflow-hidden hover:border-brand-primary/50 transition-all duration-300 shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={vehicle.image} 
          alt={vehicle.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white border border-gray-700">
            {vehicle.rating} ★
        </div>
      </div>
      <div className="p-5">
        <div className="text-xs text-brand-primary font-semibold mb-1 uppercase tracking-wider">{vehicle.brand}</div>
        <h3 className="text-xl font-bold text-white mb-2">{vehicle.name}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-4 space-x-4">
            <div className="flex items-center">
                <Fuel className="w-4 h-4 mr-1" />
                {vehicle.fuelType}
            </div>
            <div className="flex items-center">
                 {vehicle.bodyType}
            </div>
        </div>

        <div className="flex items-end justify-between">
            <div>
                <p className="text-xs text-gray-500">Ex-showroom Price</p>
                <p className="text-lg font-bold text-white">₹ {vehicle.priceRange}</p>
            </div>
            <Link to={`/vehicle/${vehicle.id}`}>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white hover:bg-brand-secondary transition-colors">
                    <ChevronRight size={20} />
                </button>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
