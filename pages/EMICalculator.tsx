import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const EMICalculator: React.FC = () => {
  const [amount, setAmount] = useState(1000000); // 10 Lakh
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(5); // Years
  const [downPayment, setDownPayment] = useState(200000);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const loanAmount = amount - downPayment;
    if (loanAmount <= 0) {
        setEmi(0);
        setTotalInterest(0);
        return;
    }
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const calcEmi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.round(calcEmi));
    setTotalInterest(Math.round((calcEmi * n) - loanAmount));
  }, [amount, rate, tenure, downPayment]);

  const data = [
    { name: 'Principal', value: amount - downPayment },
    { name: 'Interest', value: totalInterest },
  ];
  const COLORS = ['#1E88E5', '#374151'];

  return (
    <div className="pt-24 min-h-screen container mx-auto px-4 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Smart EMI Calculator</h1>
        
        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-brand-card p-8 rounded-2xl border border-gray-800">
                <div className="mb-6">
                    <label className="block text-gray-400 mb-2 font-medium">Vehicle Price (₹)</label>
                    <input 
                        type="range" min="100000" max="5000000" step="50000" 
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="text-right text-xl font-bold text-brand-primary mt-2">₹ {amount.toLocaleString()}</div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2 font-medium">Down Payment (₹)</label>
                    <input 
                        type="range" min="0" max={amount * 0.8} step="10000" 
                        value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="text-right text-xl font-bold text-brand-primary mt-2">₹ {downPayment.toLocaleString()}</div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2 font-medium">Interest Rate (%)</label>
                    <input 
                        type="range" min="5" max="20" step="0.1" 
                        value={rate} onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="text-right text-xl font-bold text-brand-primary mt-2">{rate} %</div>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-400 mb-2 font-medium">Loan Tenure (Years)</label>
                    <input 
                        type="range" min="1" max="10" step="1" 
                        value={tenure} onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="text-right text-xl font-bold text-brand-primary mt-2">{tenure} Years</div>
                </div>
            </div>

            <div className="bg-brand-card p-8 rounded-2xl border border-gray-800 flex flex-col justify-center items-center text-center">
                 <div className="text-gray-400 mb-2">Monthly EMI</div>
                 <div className="text-5xl font-bold text-white mb-6">₹ {emi.toLocaleString()}</div>
                 
                 <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
                 
                 <div className="flex w-full justify-between px-10 text-sm mt-4">
                     <div>
                         <span className="inline-block w-3 h-3 rounded-full bg-brand-primary mr-2"></span>
                         Principal
                     </div>
                     <div>
                         <span className="inline-block w-3 h-3 rounded-full bg-gray-700 mr-2"></span>
                         Interest
                     </div>
                 </div>
                 <div className="mt-6 pt-6 border-t border-gray-700 w-full flex justify-between">
                     <div className="text-gray-400">Total Payable</div>
                     <div className="font-bold text-white">₹ {(amount - downPayment + totalInterest).toLocaleString()}</div>
                 </div>
                 
                 <button className="w-full mt-6 bg-brand-primary text-white font-bold py-3 rounded-xl hover:bg-brand-secondary transition-colors">
                     Apply for Loan
                 </button>
            </div>
        </div>
    </div>
  );
};

export default EMICalculator;