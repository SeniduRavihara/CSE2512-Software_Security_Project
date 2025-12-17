'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, ShoppingBag, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center items-center text-center">
        
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-8 inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
          <span className="text-sm font-medium text-indigo-300">Next Gen E-Commerce Security</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent"
        >
          Secure. Fast. <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Limitless.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl"
        >
          Experience the future of secure online shopping. Powered by advanced encryption and a seamless user experience.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/signup" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10 flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          
          <Link href="/login" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full backdrop-blur-md hover:bg-white/10 transition-colors">
            Log In
          </Link>
        </motion.div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
           <FeatureCard icon={<ShieldCheck className="h-6 w-6 text-emerald-400" />} title="Secure Auth" desc="Enterprise-grade protection." delay={0.4} />
           <FeatureCard icon={<Zap className="h-6 w-6 text-yellow-400" />} title="Blazing Fast" desc="Optimized for speed." delay={0.5} />
           <FeatureCard icon={<ShoppingBag className="h-6 w-6 text-pink-400" />} title="Premium UX" desc="Designed for humans." delay={0.6} />
        </div>

      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-left"
    >
      <div className="mb-4 p-3 rounded-lg bg-white/5 w-fit">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  )
}
