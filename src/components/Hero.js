'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const navRef = useRef(null);
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '212000000000'; // Replace with your actual WhatsApp number
    const message = 'Bonjour, je suis intéressé par vos services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePricingClick = () => {
    router.push('/pricing');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav animation - more subtle and faster
      gsap.from(navRef.current.children, {
        y: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out'
      });

      // Text animation - smoother entrance
      gsap.from(textRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/bg-pattern.jpg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            filter: 'blur(1px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-indigo-900/90 to-purple-950/95" />

        {/* Abstract shapes for modern look */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      {/* Navigation - with glass effect */}
      <nav ref={navRef} className="relative z-10 py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <Image src="/pfema-logo.png" alt="PFEMA" width={32} height={32} className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="text-white font-bold text-xl font-carrois tracking-wider">PFEMA</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="cursor-pointer text-gray-200 hover:text-white transition-colors duration-300 font-inter text-sm font-medium">
              À propos
            </button>
            <button onClick={() => scrollToSection('services')} className="cursor-pointer text-gray-200 hover:text-white transition-colors duration-300 font-inter text-sm font-medium">
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className="cursor-pointer text-gray-200 hover:text-white transition-colors duration-300 font-inter text-sm font-medium">
              Contact
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] font-carrois">
              Commencer
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content - Improved spacing and typography */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div ref={textRef} className="text-center max-w-4xl">
          <div className="mb-2 inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
            <span className="text-blue-300 text-sm font-medium font-inter">Excellence et innovation</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 font-carrois tracking-wide">
            <span className="block text-blue-400 text-6xl lg:text-8xl share-tech-regular mb-4">Bienvenue chez</span>
            <span className="block text-white text-3xl lg:text-8xl playwrite-dk-loopet-100">PFEMA</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-10 text-gray-100 font-inter max-w-2xl mx-auto">
            <span className="block">On est là pour t'accompagner jusqu'à la réussite de ton projet.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] font-carrois">
              Commencer
            </button>
            <button onClick={handlePricingClick} className="w-full sm:w-auto bg-white/5 hover:bg-white/15 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:border-white/40 font-carrois">
              Tableau de tarification
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - More subtle and modern */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};