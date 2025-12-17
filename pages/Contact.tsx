import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Dealer Network</h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">We are currently onboarding top dealers across Bhubaneswar, Bangalore, Mumbai, and Delhi. Join us today.</p>
        
        <form className="max-w-md mx-auto bg-brand-card p-8 rounded-2xl border border-gray-800 text-left">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Dealer / Brand Name</label>
                <input type="text" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-primary outline-none" placeholder="e.g. Acme Motors" />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input type="email" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-primary outline-none" placeholder="contact@dealer.com" />
            </div>
             <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-primary outline-none" rows={4} placeholder="Tell us about your inventory"></textarea>
            </div>
            <button className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-secondary transition-colors">
                Request Callback
            </button>
        </form>
    </div>
  );
};

export default Contact;