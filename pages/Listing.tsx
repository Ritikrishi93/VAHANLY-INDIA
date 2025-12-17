
import React, { useMemo, useState } from 'react';
// Fix: Use namespaced import to bypass "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
const { useLocation } = ReactRouterDOM as any;
import { VEHICLES } from '../constants';
import { VehicleType } from '../types';
import VehicleCard from '../components/VehicleCard';
import { Filter } from 'lucide-react';

interface ListingProps {
  type?: VehicleType;
}

const Listing: React.FC<ListingProps> = ({ type }) => {
  const location = useLocation();
  const title = type ? `${type}s` : 'All Vehicles';
  
  // Basic filtering logic
  const [priceSort, setPriceSort] = useState<'low' | 'high' | null>(null);

  const filteredVehicles = useMemo(() => {
    let result = [];
      
    // Specific logic: If type is EV, show all EVs. If type is CAR, show cars that are not only EV (or mixed).
    // For MVP simplicity in constants, we labelled them strictly.
    if (type === VehicleType.CAR) {
        result = VEHICLES.filter(v => v.type === VehicleType.CAR);
    } else if (type === VehicleType.BIKE) {
        result = VEHICLES.filter(v => v.type === VehicleType.BIKE);
    } else if (type === VehicleType.EV) {
        result = VEHICLES.filter(v => v.fuelType === 'Electric');
    } else {
        result = [...VEHICLES];
    }

    if (priceSort === 'low') {
        result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (priceSort === 'high') {
        result.sort((a, b) => b.basePrice - a.basePrice);
    }
    return result;
  }, [type, priceSort]);

  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">{title} in India</h1>
            <p className="text-gray-400">Showing {filteredVehicles.length} results</p>
        </div>
        
        <div className="flex space-x-4 mt-4 md:mt-0">
             <div className="relative">
                <select 
                    onChange={(e) => setPriceSort(e.target.value as any)}
                    className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg focus:ring-brand-primary focus:border-brand-primary block w-full p-2.5"
                >
                    <option value="">Sort By Price</option>
                    <option value="low">Price: Low to High</option>
                    <option value="high">Price: High to Low</option>
                </select>
             </div>
             <button className="flex items-center bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                <Filter className="w-4 h-4 mr-2" /> Filters
             </button>
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map(v => (
                <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
      ) : (
          <div className="text-center py-20 text-gray-500">
              <h2 className="text-xl">No vehicles found in this category yet.</h2>
              <p>Check back soon as we add more inventory.</p>
          </div>
      )}
    </div>
  );
};

export default Listing;
