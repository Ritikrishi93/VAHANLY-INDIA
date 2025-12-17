
import React, { useEffect } from 'react';
// Fix: Use namespaced import to bypass "no exported member" errors in this environment
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Listing from './pages/Listing';
import VehicleDetail from './pages/VehicleDetail';
import Compare from './pages/Compare';
import EMICalculator from './pages/EMICalculator';
import Contact from './pages/Contact';
import { VehicleType } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-brand-primary selection:text-white">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Listing type={VehicleType.CAR} />} />
            <Route path="/bikes" element={<Listing type={VehicleType.BIKE} />} />
            <Route path="/ev" element={<Listing type={VehicleType.EV} />} />
            <Route path="/vehicle/:id" element={<VehicleDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
