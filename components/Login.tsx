import React, { useState } from 'react';
import { Icons } from './Icons';

interface LoginProps {
  onLogin: (code: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onLogin(code);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{
        // High-quality Taipei 101 background
        backgroundImage: `url('https://i.ibb.co/wFfGqZby/taipei-101.jpg')`
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 border border-white/20">
        <div className="flex justify-center mb-6">
           {/* Logo Image */}
           <img 
             src="https://i.ibb.co/KjtVZ6jy/image.png"
             alt="Lion Travel" 
             className="h-16 object-contain"
           />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">LION GO</h2>
        <p className="text-gray-500 text-center mb-8">Enter your Order Auth Code to begin planning.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auth Code</label>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. TAIWAN-2025"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-white/50 focus:bg-white"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-[1.02]"
          >
            Start Planning
            <Icons.ArrowRight className="w-5 h-5" />
          </button>
        </form>
        <div className="mt-6 text-center text-xs text-gray-400">
          Powered by Lion Travel Phygital Engine
        </div>
      </div>
    </div>
  );
};

export default Login;