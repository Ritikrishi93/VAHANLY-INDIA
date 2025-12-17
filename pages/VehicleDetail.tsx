
import React, { useState, useEffect, useRef } from 'react';
// Fix: Use namespaced import for react-router-dom to bypass "no exported member" errors
import * as ReactRouterDOM from 'react-router-dom';
const { useParams, Link, useNavigate } = ReactRouterDOM as any;
import { VEHICLES } from '../constants';
import { Vehicle } from '../types';
import VehicleCard from '../components/VehicleCard';
import { 
    Check, Info, Shield, Zap, Gauge, 
    ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Box, Fuel,
    MapPin, Star, ThumbsUp, ThumbsDown, X, Calendar, Clock, Phone, User,
    ShieldCheck, ExternalLink, HelpCircle, Activity, ZapOff, Wind,
    IndianRupee, Maximize
} from 'lucide-react';
// Fix: Cast motion to any to bypass "property does not exist" errors
import { motion as motion_base, AnimatePresence } from 'framer-motion';
const motion = motion_base as any;

// --- Modals Components ---

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-brand-card w-full max-w-lg rounded-2xl border border-gray-800 shadow-2xl overflow-hidden"
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-800">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

const VehicleDetail: React.FC = () => {
  // Fix: useParams is untyped when extracted from 'any', manual casting required
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const vehicle = VEHICLES.find(v => v.id === id);
  const [selectedVariant, setSelectedVariant] = useState(vehicle?.variants[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openSection, setOpenSection] = useState<string>('Performance');
  const [insuranceType, setInsuranceType] = useState<'comp' | 'third'>('comp');
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Modal States
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInsuranceCompareOpen, setIsInsuranceCompareOpen] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // Refs for scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const insuranceRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (vehicle) setSelectedVariant(vehicle.variants[0]);
    window.scrollTo(0, 0);
  }, [vehicle, id]);

  if (!vehicle || !selectedVariant) return <div className="pt-32 text-center text-white">Vehicle not found</div>;

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.image];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  const toggleSection = (section: string) => setOpenSection(openSection === section ? '' : section);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, tab: string) => {
      setActiveTab(tab);
      if (ref.current) {
          const yOffset = -120; // Account for fixed headers
          const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({top: y, behavior: 'smooth'});
      }
  };

  const similarVehicles = VEHICLES.filter(v => vehicle.similarIds?.includes(v.id));

  // Insurance pricing simulation
  const baseInsurance = Math.round(selectedVariant.price * 100000 * (insuranceType === 'comp' ? 0.035 : 0.012));
  const insuranceProviders = [
    { name: 'VahanSecure', rating: 4.9, price: baseInsurance, features: ['Zero Dep', '24/7 Roadside', '1500+ Garages'], tag: 'Best Rated' },
    { name: 'MetroPolicy', rating: 4.7, price: Math.round(baseInsurance * 0.95), features: ['Cashless', 'Key Replacement'], tag: 'Value' },
    { name: 'AutoShield', rating: 4.8, price: Math.round(baseInsurance * 1.05), features: ['Engine Protection', 'Consumables'], tag: 'Premium' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setFormSuccess(true);
      setTimeout(() => {
          setFormSuccess(false);
          setIsTestDriveOpen(false);
          setIsBookingOpen(false);
      }, 3000);
  };

  const BookingForm = ({ type }: { type: 'Test Drive' | 'Booking' }) => (
      formSuccess ? (
          <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <Check size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Request Sent!</h3>
              <p className="text-gray-400">Our dealer will contact you shortly to confirm your {type.toLowerCase()}.</p>
          </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input required type="text" className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-brand-primary outline-none" placeholder="John Doe" />
                </div>
            </div>
            <div>
                <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <input required type="tel" className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-brand-primary outline-none" placeholder="+91 98765 43210" />
                </div>
            </div>
            
            {type === 'Test Drive' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Preferred Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <input required type="date" className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-brand-primary outline-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Time Slot</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                            <select className="w-full bg-black border border-gray-700 rounded-lg py-2.5 pl-10 text-white focus:border-brand-primary outline-none appearance-none">
                                <option>Morning</option>
                                <option>Afternoon</option>
                                <option>Evening</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm text-gray-400 mb-1">Select Dealer</label>
                <select className="w-full bg-black border border-gray-700 rounded-lg py-2.5 px-3 text-white focus:border-brand-primary outline-none">
                    {vehicle.dealers.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.distance})</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-secondary transition-colors mt-2">
                Confirm {type} Request
            </button>
        </form>
      )
  );

  return (
    <div className="pt-20 min-h-screen bg-black pb-32 md:pb-20 text-white">
      {/* Modals */}
      <Modal isOpen={isTestDriveOpen} onClose={() => setIsTestDriveOpen(false)} title={`Book Test Drive: ${vehicle.name}`}>
          <BookingForm type="Test Drive" />
      </Modal>
      <Modal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} title={`Get Best Offer: ${vehicle.name}`}>
          <BookingForm type="Booking" />
      </Modal>

      {/* Insurance Compare Modal */}
      <Modal isOpen={isInsuranceCompareOpen} onClose={() => setIsInsuranceCompareOpen(false)} title="Compare Insurance Plans">
          <div className="space-y-6">
              <p className="text-sm text-gray-400">Detailed breakdown of top plans for your {vehicle.name}.</p>
              <div className="grid grid-cols-1 gap-4">
                  {insuranceProviders.map(p => (
                      <div key={p.name} className="p-4 border border-gray-800 rounded-xl bg-black/40">
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold text-white text-lg">{p.name}</h4>
                              <div className="text-brand-primary font-bold">₹ {p.price.toLocaleString()}/yr</div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                              <div className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-2"/> 0% Depreciation</div>
                              <div className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-2"/> Cashless Claims</div>
                              <div className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-2"/> Consumables Cover</div>
                              <div className="flex items-center"><Check className="w-3 h-3 text-green-500 mr-2"/> RSA Included</div>
                          </div>
                          <button className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white text-sm font-bold py-2 rounded-lg">View Detailed Policy</button>
                      </div>
                  ))}
              </div>
          </div>
      </Modal>

      {/* Sub Navigation Bar (Sticky) */}
      <div className="sticky top-16 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800 hidden md:block">
          <div className="container mx-auto px-4">
              <div className="flex space-x-8 h-14 items-center">
                  {[
                      {id: 'overview', label: 'Overview', ref: overviewRef},
                      {id: 'specs', label: 'Specifications', ref: specsRef},
                      {id: 'reviews', label: 'Reviews', ref: reviewsRef},
                      {id: 'insurance', label: 'Insurance', ref: insuranceRef},
                  ].map(tab => (
                      <button 
                        key={tab.id} 
                        onClick={() => scrollToSection(tab.ref, tab.id)}
                        className={`text-sm font-semibold transition-all relative h-full flex items-center ${activeTab === tab.id ? 'text-brand-primary' : 'text-gray-400 hover:text-white'}`}
                      >
                          {tab.label}
                          {activeTab === tab.id && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
                      </button>
                  ))}
              </div>
          </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 flex items-center">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/${vehicle.type === 'Car' ? 'cars' : vehicle.type === 'Bike' ? 'bikes' : 'ev'}`} className="hover:text-white transition-colors">{vehicle.type}s</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-primary font-medium">{vehicle.name}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7">
                {/* Gallery Carousel */}
                <div ref={overviewRef} className="mb-8">
                    <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 aspect-[16/9] group shadow-2xl">
                        <AnimatePresence mode='wait'>
                            <motion.img 
                                key={currentImageIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                src={images[currentImageIndex]} 
                                alt={`${vehicle.name} view ${currentImageIndex + 1}`} 
                                className="w-full h-full object-cover" 
                            />
                        </AnimatePresence>
                        
                        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={prevImage} className="bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm border border-gray-700 shadow-lg">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} className="bg-black/60 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm border border-gray-700 shadow-lg">
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                            {images.map((_, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={`h-1.5 rounded-full transition-all ${currentImageIndex === i ? 'bg-brand-primary w-6' : 'bg-white/40 w-1.5'}`}
                                />
                            ))}
                        </div>

                        {vehicle.type === 'EV' && (
                            <div className="absolute top-4 left-4 bg-green-900/90 text-green-300 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-green-700 shadow-lg backdrop-blur-md">
                                <Zap className="w-3 h-3 mr-1" /> ELECTRIC
                            </div>
                        )}
                    </div>
                    
                    <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setCurrentImageIndex(idx)} 
                                className={`relative min-w-[120px] aspect-video rounded-xl overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-brand-primary ring-4 ring-brand-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Key Highlights Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-brand-card border border-gray-800 p-4 rounded-2xl flex flex-col items-center text-center">
                        <Activity className="w-5 h-5 text-brand-primary mb-2" />
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Power</span>
                        <span className="text-sm font-bold">{vehicle.specs.power}</span>
                    </div>
                    <div className="bg-brand-card border border-gray-800 p-4 rounded-2xl flex flex-col items-center text-center">
                        <Wind className="w-5 h-5 text-brand-primary mb-2" />
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Torque</span>
                        <span className="text-sm font-bold">{vehicle.specs.torque}</span>
                    </div>
                    <div className="bg-brand-card border border-gray-800 p-4 rounded-2xl flex flex-col items-center text-center">
                        <ZapOff className="w-5 h-5 text-brand-primary mb-2" />
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{vehicle.type === 'EV' ? 'Range' : 'Mileage'}</span>
                        <span className="text-sm font-bold">{vehicle.specs.mileage}</span>
                    </div>
                    <div className="bg-brand-card border border-gray-800 p-4 rounded-2xl flex flex-col items-center text-center">
                        <Gauge className="w-5 h-5 text-brand-primary mb-2" />
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Seating</span>
                        <span className="text-sm font-bold">{vehicle.specs.seating} Pax</span>
                    </div>
                </div>

                {/* Things We Like/Consider */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 border-l-4 border-l-green-500">
                        <h3 className="text-lg font-bold mb-5 flex items-center text-green-400">
                            <ThumbsUp className="w-5 h-5 mr-3" /> Expert Pros
                        </h3>
                        <ul className="space-y-4">
                            {vehicle.pros.map((pro, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-300">
                                    <div className="p-1 bg-green-500/10 rounded-full mr-3 mt-0.5">
                                        <Check className="w-3 h-3 text-green-500" />
                                    </div> 
                                    {pro}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-brand-card p-6 rounded-2xl border border-gray-800 border-l-4 border-l-red-500">
                        <h3 className="text-lg font-bold mb-5 flex items-center text-red-400">
                            <ThumbsDown className="w-5 h-5 mr-3" /> Expert Cons
                        </h3>
                        <ul className="space-y-4">
                            {vehicle.cons.map((con, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-300">
                                    <div className="p-1 bg-red-500/10 rounded-full mr-3 mt-0.5">
                                        <X className="w-3 h-3 text-red-500" />
                                    </div> 
                                    {con}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Detailed Specifications Accordions */}
                <div ref={specsRef} className="space-y-4 mb-12">
                    <div className="flex justify-between items-end mb-6">
                        <h3 className="text-2xl font-bold">Detailed Specifications</h3>
                        <button className="text-xs text-brand-primary font-bold hover:underline">Download PDF</button>
                    </div>
                    
                    {[
                        {id: 'Performance', icon: Gauge, label: 'Engine & Performance', details: [
                            {label: 'Engine / Motor', value: vehicle.specs.engine || 'Electric Motor'},
                            {label: 'Max Power', value: vehicle.specs.power},
                            {label: 'Max Torque', value: vehicle.specs.torque},
                            {label: 'Transmission', value: vehicle.specs.transmission},
                            {label: vehicle.type === 'EV' ? 'Range' : 'Mileage', value: vehicle.specs.mileage}
                        ]}, 
                        {id: 'Dimensions', icon: Maximize, label: 'Dimensions & Capacity', details: [
                            {label: 'Body Type', value: vehicle.bodyType},
                            {label: 'Seating Capacity', value: `${vehicle.specs.seating} Seater`},
                            {label: 'Boot Space', value: vehicle.specs.bootSpace || 'TBA'},
                            {label: 'Ground Clearance', value: '180-200 mm (Approx)'},
                            {label: 'Fuel Tank / Battery', value: vehicle.type === 'EV' ? 'High Capacity Lithium-ion' : 'Standard Tank'}
                        ]}, 
                        {id: 'Features', icon: ShieldCheck, label: 'Safety & Warranty', details: [
                            {label: 'Warranty', value: vehicle.specs.warranty || '3 Years / 1,00,000 km'},
                            {label: 'Standard Safety', value: 'ABS, EBD, Dual Airbags'},
                            {label: 'Variant Specific', value: selectedVariant.features.slice(0, 3).join(', ')},
                            {label: 'Top Speed', value: 'Segment Best'}
                        ]}
                    ].map((section) => (
                         <div key={section.id} className="border border-gray-800 rounded-2xl bg-brand-card overflow-hidden">
                            <button 
                                onClick={() => toggleSection(section.id)} 
                                className={`w-full flex justify-between items-center p-6 text-left font-semibold hover:bg-gray-800/50 transition-all ${openSection === section.id ? 'bg-gray-800/30' : ''}`}
                            >
                                <span className="flex items-center text-lg">
                                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mr-4">
                                        <section.icon className="w-5 h-5 text-brand-primary"/> 
                                    </div>
                                    {section.label}
                                </span>
                                <motion.div animate={{ rotate: openSection === section.id ? 180 : 0 }}>
                                    <ChevronDown size={20} className="text-gray-500"/>
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openSection === section.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }} 
                                        animate={{ height: 'auto', opacity: 1 }} 
                                        exit={{ height: 0, opacity: 0 }} 
                                        className="border-t border-gray-800"
                                    >
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                            {section.details.map((item, i) => (
                                                <div key={i} className="flex justify-between border-b border-gray-800/50 pb-3">
                                                    <span className="text-gray-500 text-sm">{item.label}</span>
                                                    <span className="font-semibold text-sm">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Reviews Section */}
                <div ref={reviewsRef} className="mb-12">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold">What Owners Say</h3>
                        <div className="flex items-center bg-green-500/10 px-4 py-2 rounded-2xl border border-green-500/20">
                            <span className="text-2xl font-extrabold text-green-500 mr-2">{vehicle.rating}</span> 
                            <div className="flex flex-col">
                                <div className="flex text-green-500"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                                <span className="text-[10px] text-gray-500 uppercase font-bold">{vehicle.reviews} Reviews</span>
                            </div>
                        </div>
                     </div>
                     <div className="grid md:grid-cols-2 gap-4">
                         {vehicle.reviewsList.map(review => (
                             <div key={review.id} className="bg-brand-card p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                                 <div className="flex justify-between items-start mb-4">
                                     <div className="flex items-center">
                                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-blue-700 flex items-center justify-center font-bold text-sm mr-3 shadow-lg">
                                             {review.user[0]}
                                         </div>
                                         <div>
                                             <p className="text-sm font-bold text-white">{review.user}</p>
                                             <p className="text-xs text-gray-500">{review.date}</p>
                                         </div>
                                     </div>
                                     <div className="flex items-center text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded-lg">
                                         {review.rating} <Star className="w-3 h-3 ml-1 fill-current" />
                                     </div>
                                 </div>
                                 <p className="text-gray-300 text-sm leading-relaxed italic">"{review.comment}"</p>
                             </div>
                         ))}
                     </div>
                </div>

                {/* Insurance Section - MOVED BELOW REVIEWS */}
                <div ref={insuranceRef} className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center">
                            <ShieldCheck className="w-8 h-8 text-brand-primary mr-4" />
                            <h2 className="text-2xl font-bold">Insurance Price Comparison</h2>
                        </div>
                        <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
                            <button 
                                onClick={() => setInsuranceType('comp')}
                                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${insuranceType === 'comp' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                            >
                                Comprehensive
                            </button>
                            <button 
                                onClick={() => setInsuranceType('third')}
                                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${insuranceType === 'third' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                            >
                                Third Party
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {insuranceProviders.map((p) => (
                            <motion.div 
                                key={p.name}
                                whileHover={{ y: -4 }}
                                className={`relative p-6 rounded-2xl border transition-all ${p.tag === 'Best Rated' ? 'bg-brand-primary/5 border-brand-primary/50 ring-1 ring-brand-primary/20' : 'bg-brand-card border-gray-800'}`}
                            >
                                {p.tag && (
                                    <span className="absolute -top-3 left-6 bg-brand-primary text-white text-[10px] px-3 py-1 rounded-full shadow-lg font-bold uppercase tracking-widest">
                                        {p.tag}
                                    </span>
                                )}
                                <div className="flex items-center justify-between mb-4 mt-2">
                                    <h4 className="font-bold text-lg">{p.name}</h4>
                                    <div className="flex items-center text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-1 rounded-lg">
                                        {p.rating} <Star className="w-3 h-3 ml-1 fill-current" />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold text-white mb-6">
                                    ₹ {p.price.toLocaleString()} <span className="text-xs font-normal text-gray-500">/ year</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {p.features.map(f => (
                                        <li key={f} className="flex items-center text-xs text-gray-400">
                                            <Check className="w-4 h-4 text-brand-primary mr-3 flex-shrink-0" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-white text-black text-xs font-bold py-3 rounded-xl hover:bg-brand-primary hover:text-white transition-all shadow-md">
                                    Add to Quote
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Sidebar (5 cols) */}
            <div className="lg:col-span-5">
                <div className="sticky top-32">
                    <div className="mb-6">
                        <div className="flex items-center space-x-2 text-brand-primary text-xs font-black mb-2 uppercase tracking-[0.2em]">
                            <Fuel className="w-4 h-4" /> <span>{vehicle.fuelType} • {vehicle.brand}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tighter">{vehicle.name}</h1>
                        <div className="flex items-center space-x-4">
                            <span className="bg-gray-900 text-xs font-bold text-gray-400 px-3 py-1 rounded-full border border-gray-800">{vehicle.bodyType}</span>
                            <span className="bg-gray-900 text-xs font-bold text-gray-400 px-3 py-1 rounded-full border border-gray-800">Bhubaneswar</span>
                        </div>
                    </div>

                    <div className="bg-brand-card p-8 rounded-[2rem] border border-gray-800 mb-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl"></div>
                        <p className="text-gray-500 text-sm font-medium mb-1">On-Road Estimate</p>
                        <div className="flex items-baseline space-x-2 mb-6">
                            <span className="text-5xl font-black text-white">₹ {selectedVariant.price.toFixed(2)}</span>
                            <span className="text-2xl font-bold text-gray-500">Lakh</span>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-sm py-3 border-b border-gray-800/50">
                                <span className="text-gray-400 flex items-center"><Info className="w-3 h-3 mr-2" /> Ex-Showroom</span>
                                <span className="font-bold">₹ {(selectedVariant.price - 1.5).toFixed(2)} L</span>
                            </div>
                            <div className="flex justify-between text-sm py-3 border-b border-gray-800/50">
                                <span className="text-gray-400 flex items-center"><ShieldCheck className="w-3 h-3 mr-2" /> Insurance (Est)</span>
                                <span className="font-bold">₹ {baseInsurance.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm py-3 border-b border-gray-800/50">
                                <span className="text-gray-400 flex items-center"><IndianRupee className="w-3 h-3 mr-2" /> RTO + Taxes</span>
                                <span className="font-bold">₹ 1,20,000</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm p-4 bg-brand-primary/10 rounded-2xl mb-8 border border-brand-primary/20">
                            <div className="flex flex-col">
                                <span className="text-brand-primary/60 text-[10px] font-bold uppercase">Monthly EMI</span>
                                <span className="text-brand-primary font-black text-lg">₹ {Math.round(selectedVariant.price * 100000 * 0.015).toLocaleString()}</span>
                            </div>
                            <Link to="/emi-calculator" className="bg-brand-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-secondary transition-colors">
                                Customize
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setIsBookingOpen(true)} className="w-full bg-brand-primary text-white font-black py-4 rounded-2xl hover:bg-brand-secondary transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                                GET BEST OFFER
                            </button>
                            <button onClick={() => setIsTestDriveOpen(true)} className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                                BOOK TEST DRIVE
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter">Choose Variant</h3>
                            <button onClick={() => navigate('/compare')} className="text-xs text-brand-primary font-bold hover:underline flex items-center">
                                Compare All <ChevronRight className="w-3 h-3 ml-1" />
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar">
                            {vehicle.variants.map((variant) => (
                                <motion.div 
                                    key={variant.name}
                                    onClick={() => setSelectedVariant(variant)}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden group ${selectedVariant.name === variant.name ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-800 hover:border-gray-600 bg-gray-900/50'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="z-10">
                                            <div className="flex items-center">
                                                <span className={`font-black text-lg ${selectedVariant.name === variant.name ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>{variant.name}</span>
                                                {selectedVariant.name === variant.name && <Check className="w-5 h-5 text-brand-primary ml-2" />}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2 font-medium line-clamp-1">{variant.features.join(' • ')}</p>
                                        </div>
                                        <div className="text-right z-10">
                                            <span className="text-lg font-black text-white">₹ {variant.price} L</span>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase">On-Road</p>
                                        </div>
                                    </div>
                                    {variant.isBestValue && (
                                        <span className="absolute -top-1 -right-6 bg-yellow-600 text-white text-[8px] px-8 py-2 rotate-45 shadow-sm font-black uppercase tracking-widest">
                                            BEST VALUE
                                        </span>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Similar Vehicles Grid */}
        {similarVehicles.length > 0 && (
            <div className="mt-24">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Alternative Choices</h2>
                        <p className="text-gray-500 font-medium">Matching your profile and price range.</p>
                    </div>
                    <Link to="/cars" className="text-brand-primary font-bold hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {similarVehicles.map(v => (
                        <VehicleCard key={v.id} vehicle={v} />
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-gray-800 p-5 lg:hidden z-50 flex items-center space-x-4 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col min-w-[120px]">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">On-Road</p>
              <p className="font-black text-2xl text-white">₹ {selectedVariant.price} L</p>
          </div>
          <div className="flex flex-1 space-x-2">
            <button onClick={() => setIsTestDriveOpen(true)} className="flex-1 bg-white text-black font-black rounded-xl text-xs py-4 active:scale-95 transition-transform uppercase">Test Drive</button>
            <button onClick={() => setIsBookingOpen(true)} className="flex-1 bg-brand-primary text-white font-black rounded-xl text-xs py-4 active:scale-95 transition-transform uppercase">Book Now</button>
          </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
