
import React, { useState } from 'react';
import { VEHICLES } from '../constants';
import { Vehicle } from '../types';
import { PlusCircle, X, ShieldCheck } from 'lucide-react';
// Fix: Use namespaced import for react-router-dom to bypass "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM as any;

const Compare: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([null, null, null]);

  const handleSelect = (index: number, id: string) => {
    const newIds = [...selectedIds];
    newIds[index] = id;
    setSelectedIds(newIds);
  };

  const removeVehicle = (index: number) => {
      const newIds = [...selectedIds];
      newIds[index] = null;
      setSelectedIds(newIds);
  }

  const getVehicle = (index: number) => VEHICLES.find(v => v.id === selectedIds[index]) || null;

  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 pb-20">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Compare Vehicles</h1>
      <p className="text-gray-400 text-center mb-10 -mt-6">Add up to 3 vehicles to see a side-by-side comparison</p>
      
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px]">
            {/* Selection Header */}
            <div className="grid grid-cols-4 gap-4 mb-6 sticky top-20 z-30 bg-black py-4 border-b border-gray-800">
                <div className="flex items-end pb-2 font-bold text-gray-500">Parameters</div>
                {[0, 1, 2].map(i => {
                    const vehicle = getVehicle(i);
                    return (
                        <div key={i} className="relative">
                            {vehicle ? (
                                <div className="bg-brand-card p-4 rounded-xl border border-gray-800 h-full flex flex-col justify-end">
                                    <button onClick={() => removeVehicle(i)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500"><X size={16} /></button>
                                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                                    <h3 className="font-bold text-sm">{vehicle.name}</h3>
                                    <p className="text-brand-primary font-bold text-sm">₹ {vehicle.priceRange}</p>
                                </div>
                            ) : (
                                <div className="h-40 bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center p-4">
                                    <select 
                                        className="bg-black border border-gray-700 rounded p-2 text-white text-xs w-full mb-2 outline-none"
                                        onChange={(e) => handleSelect(i, e.target.value)}
                                        value=""
                                    >
                                        <option value="" disabled>Add Vehicle</option>
                                        {VEHICLES.filter(v => !selectedIds.includes(v.id)).map(v => (
                                            <option key={v.id} value={v.id}>{v.name}</option>
                                        ))}
                                    </select>
                                    <div className="text-gray-500 text-xs flex items-center"><PlusCircle size={14} className="mr-1" /> Add</div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Comparison Rows */}
            <div className="bg-brand-card border border-gray-800 rounded-2xl overflow-hidden">
                {[
                    { label: 'Type', key: 'type' },
                    { label: 'Fuel', key: 'fuelType' },
                    { label: 'Power', key: 'specs.power' },
                    { label: 'Torque', key: 'specs.torque' },
                    { label: 'Mileage / Range', key: 'specs.mileage' },
                    { label: 'Transmission', key: 'specs.transmission' },
                    { label: 'Boot Space', key: 'specs.bootSpace', default: '-' },
                    { label: 'User Rating', key: 'rating', suffix: ' ★' },
                ].map((row, idx) => (
                    <div key={idx} className={`grid grid-cols-4 p-4 border-b border-gray-800 ${idx % 2 === 0 ? 'bg-black/50' : 'bg-transparent'}`}>
                        <div className="text-gray-400 font-medium text-sm flex items-center">{row.label}</div>
                        {[0, 1, 2].map(i => {
                            const vehicle = getVehicle(i);
                            if (!vehicle) return <div key={i} className="text-center text-gray-600">-</div>;
                            
                            // Nested key access helper
                            const val = row.key.split('.').reduce((o: any, k) => (o || {})[k], vehicle);
                            return (
                                <div key={i} className="text-center font-semibold text-sm">
                                    {val || row.default} {row.suffix || ''}
                                </div>
                            );
                        })}
                    </div>
                ))}
                
                {/* Insurance Estimate Row */}
                <div className="grid grid-cols-4 p-4 border-b border-gray-800 bg-brand-primary/5">
                    <div className="text-gray-400 font-medium text-sm flex items-center">
                        <ShieldCheck className="w-4 h-4 mr-2 text-brand-primary" /> Est. Insurance
                    </div>
                    {[0, 1, 2].map(i => {
                        const vehicle = getVehicle(i);
                        return vehicle ? (
                            <div key={i} className="text-center text-brand-primary font-bold text-sm">
                                ~ ₹ {Math.round(vehicle.basePrice * 100000 * 0.03).toLocaleString()}
                            </div>
                        ) : <div key={i} className="text-center text-gray-600">-</div>;
                    })}
                </div>

                {/* Pros Row */}
                <div className="grid grid-cols-4 p-4 border-b border-gray-800 bg-green-900/10">
                    <div className="text-gray-400 font-medium text-sm pt-2">Pros</div>
                    {[0, 1, 2].map(i => {
                        const vehicle = getVehicle(i);
                        return vehicle ? (
                            <ul key={i} className="text-xs space-y-1 text-green-300">
                                {vehicle.pros.slice(0, 3).map((p, idx) => <li key={idx}>• {p}</li>)}
                            </ul>
                        ) : <div key={i}></div>;
                    })}
                </div>

                 {/* CTA Row */}
                 <div className="grid grid-cols-4 p-4 bg-gray-900">
                    <div></div>
                    {[0, 1, 2].map(i => {
                        const vehicle = getVehicle(i);
                        return vehicle ? (
                            <div key={i} className="text-center px-2">
                                <Link to={`/vehicle/${vehicle.id}`}>
                                    <button className="w-full bg-brand-primary py-2 rounded-lg text-white text-xs font-bold hover:bg-brand-secondary">View Details</button>
                                </Link>
                            </div>
                        ) : <div key={i}></div>;
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
