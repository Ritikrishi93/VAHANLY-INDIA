
import React, { useState } from 'react';
// Fix: Use namespaced import to bypass "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
const { useNavigate } = ReactRouterDOM as any;
// Fix: Cast motion to any to bypass property errors
import { motion as motion_base } from 'framer-motion';
const motion = motion_base as any;
import { Search, ArrowRight, Zap, ShieldCheck, IndianRupee, Layers } from 'lucide-react';
import { VEHICLES } from '../constants';
import VehicleCard from '../components/VehicleCard';
import { VehicleType } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<VehicleType>(VehicleType.CAR);
  const [searchTerm, setSearchTerm] = useState('');

  const trendingVehicles = VEHICLES.filter(v => v.rating >= 4.5).slice(0, 3);
  const evVehicles = VEHICLES.filter(v => v.type === VehicleType.EV).slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchTerm.trim()) {
        const path = activeTab === VehicleType.CAR ? '/cars' : activeTab === VehicleType.BIKE ? '/bikes' : '/ev';
        navigate(path);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/20 to-black z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                    Where India Buys <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-400">Its Next Ride</span>
                </h1>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                    Search. Compare. Decide. The smartest way to find your perfect car, bike, or EV in India.
                </p>
            </motion.div>

            {/* Smart Search Bar */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-gray-900/80 backdrop-blur-lg border border-gray-700 p-2 rounded-2xl max-w-3xl mx-auto shadow-2xl"
            >
                <div className="flex space-x-2 mb-2 p-1">
                    {[VehicleType.CAR, VehicleType.BIKE, VehicleType.EV].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === type ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800'}`}
                        >
                            {type}s
                        </button>
                    ))}
                </div>
                <form onSubmit={handleSearch} className="relative flex items-center bg-black rounded-xl p-2 border border-gray-800 focus-within:border-brand-primary transition-colors">
                    <Search className="text-gray-500 ml-3 w-6 h-6" />
                    <input 
                        type="text" 
                        placeholder={`Search for ${activeTab.toLowerCase()}s (e.g. Nexon, Creta)...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent text-white px-4 py-3 focus:outline-none text-lg placeholder-gray-600"
                    />
                    <button type="submit" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors">
                        Search
                    </button>
                </form>
            </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['Hatchback', 'Sedan', 'SUV', 'Sports Bike', 'Scooter', 'Electric'].map((cat, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center cursor-pointer hover:border-brand-primary group transition-all"
                        onClick={() => navigate(cat === 'Electric' ? '/ev' : cat === 'Sports Bike' || cat === 'Scooter' ? '/bikes' : '/cars')}
                    >
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-primary transition-colors">
                            <Layers className="text-white w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-gray-300 group-hover:text-white">{cat}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Trending EVs */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Trending EVs ⚡</h2>
                    <p className="text-gray-400">The future of Indian mobility.</p>
                </div>
                <button onClick={() => navigate('/ev')} className="text-brand-primary flex items-center font-medium hover:text-brand-secondary">
                    View All <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {evVehicles.map(v => (
                    <VehicleCard key={v.id} vehicle={v} />
                ))}
            </div>
        </div>
      </section>

      {/* Why Choose Vahanly */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-4">Why India Chooses Vahanly</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">We solve the chaos of automotive buying with data, transparency, and simplicity.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-brand-card p-8 rounded-2xl border border-gray-800">
                    <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                        <ShieldCheck className="text-brand-primary w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Trusted Comparisons</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Unbiased, side-by-side comparisons of specs, features, and real on-road prices.
                    </p>
                </div>
                <div className="bg-brand-card p-8 rounded-2xl border border-gray-800">
                    <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                        <IndianRupee className="text-brand-primary w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Smart EMI Tools</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Calculate accurate monthly payments and down payments before you visit the showroom.
                    </p>
                </div>
                <div className="bg-brand-card p-8 rounded-2xl border border-gray-800">
                    <div className="w-14 h-14 bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                        <Zap className="text-brand-primary w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">EV Ready</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Dedicated range, charging time, and battery warranty info for the EV generation.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Ready to find your dream ride?</h2>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                <button onClick={() => navigate('/cars')} className="bg-brand-primary text-white font-bold py-4 px-10 rounded-full shadow-lg hover:bg-brand-secondary transition-all transform hover:scale-105">
                    Search Vehicles
                </button>
                <button onClick={() => navigate('/compare')} className="bg-gray-800 text-white font-bold py-4 px-10 rounded-full border border-gray-700 hover:bg-gray-700 transition-all">
                    Compare Models
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
