/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Leaf, ChevronRight, Sprout, ShieldCheck, LayoutDashboard, ClipboardList, Menu, X, } from 'lucide-react';

/**
 * LOGO COMPONENT
 * A reusable branding element.
 */
export const Logo = () => (
  <div className="flex items-center gap-2 group cursor-pointer">
    <div className="p-2 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
      <Leaf className="w-6 h-6 text-white" />
    </div>
    <span className="text-xl font-bold text-emerald-900 tracking-tight">
      Shamba<span className="text-emerald-600">Records</span>
    </span>
  </div>
);

/**
 * NAVBAR COMPONENT
 */
export const Navbar = ({ onAuthClick }: { onAuthClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Logo />
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
            <a href="#impact" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Impact</a>
            <button 
              onClick={onAuthClick}
              className="bg-emerald-600 text-white px-7 py-3 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-100"
            >
              Sign In
            </button>
          </div>

          <button className="md:hidden text-emerald-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-50 p-4 space-y-4">
          <a href="#features" className="block px-4 py-2 text-slate-600 font-medium text-center">Features</a>
          <a href="#impact" className="block px-4 py-2 text-slate-600 font-medium text-center">Impact</a>
          <button onClick={onAuthClick} className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold">Sign In</button>
        </div>
      )}
    </nav>
  );
};

/**
 * HERO COMPONENT
 */
export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => (
  <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black mb-8 tracking-widest uppercase">
          <Sprout className="w-4 h-4" /> Smart Season 2026
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-emerald-900 mb-8 leading-[0.9] tracking-tighter">
          Digitizing the <br />
          <span className="text-emerald-600 italic">Future of Farming.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          The ultimate platform for agricultural cooperatives. Track every field, 
          manage every agent, and grow every season with precision data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button 
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg hover:bg-emerald-900 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200 group"
          >
            Start Your Season <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-10 py-5 bg-white text-emerald-900 border-2 border-emerald-100 rounded-[1.5rem] font-black text-lg hover:border-emerald-300 transition-all">
            See the Impact
          </button>
        </div>
      </div>
    </div>
    
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[120px] -mr-48 -mt-48" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/30 rounded-full blur-[100px] -ml-24 -mb-24" />
  </header>
);

/**
 * FEATURE CARD COMPONENT
 */
const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-10 bg-white rounded-[2.5rem] border border-emerald-50 hover:border-emerald-200 transition-all hover:shadow-2xl hover:shadow-emerald-100 group">
    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-8 h-8 text-emerald-600" />
    </div>
    <h3 className="text-2xl font-bold text-emerald-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">
      {description}
    </p>
  </div>
);

/**
 * FEATURES SECTION
 */
export const Features = () => (
  <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-3 gap-10">
      <FeatureCard 
        icon={ClipboardList}
        title="Field Intelligence"
        description="Automatic status tracking. Our system alerts you when a field is 'At Risk' based on activity patterns."
      />
      <FeatureCard 
        icon={ShieldCheck}
        title="Secure Observations"
        description="Field agents can log notes in real-time. Every entry is cryptographically linked to the agent."
      />
      <FeatureCard 
        icon={LayoutDashboard}
        title="Admin Oversight"
        description="Manage your entire cooperative from a single pane of glass. Assign fields and monitor progress effortlessly."
      />
    </div>
  </section>
);

/**
 * FOOTER COMPONENT
 */
export const Footer = () => (
  <footer className="py-20 border-t border-emerald-50 bg-slate-50/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <Logo />
      <p className="mt-6 text-slate-400 font-medium text-center max-w-md">
        The standard for agricultural data in Kenya. Built for the modern cooperative.
      </p>
      <div className="mt-10 pt-10 border-t border-slate-200 w-full text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          © 2026 Shamba Records • Digitizing Agriculture
        </span>
      </div>
    </div>
  </footer>
);