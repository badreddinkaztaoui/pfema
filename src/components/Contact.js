'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const contactRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Responsive animation settings
      const animationDuration = isMobile ? 0.5 : 0.7;
      const staggerDelay = isMobile ? 0.1 : 0.15;

      gsap.from(contentRef.current.children, {
        y: isMobile ? 20 : 30,
        opacity: 0,
        duration: animationDuration,
        stagger: staggerDelay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: isMobile ? 'top center+=150' : 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: isMobile ? 30 : 40,
            opacity: 0,
            duration: isMobile ? 0.6 : 0.8,
            delay: 0.2 + (index * (isMobile ? 0.1 : 0.2)),
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contactRef.current,
              start: isMobile ? 'top center+=100' : 'top center+=50',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '212694019452';
    const message = 'Bonjour, je suis intéressé par vos services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 15% 85%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)',
          }}
        />
        <div className="absolute top-0 right-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 85% 25%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)',
          }}
        />
      </div>

      {/* Responsive Background Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-blue-500/5 blur-xl sm:blur-2xl" />
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 h-24 sm:w-48 sm:h-48 rounded-full bg-purple-500/5 blur-2xl sm:blur-3xl" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 sm:-left-12 w-12 h-40 sm:w-24 sm:h-80 bg-gradient-to-b from-blue-400/10 to-transparent blur-xl sm:blur-2xl rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
            <span className="h-px w-6 sm:w-8 bg-blue-400"></span>
            <span className="text-blue-400 uppercase text-xs sm:text-sm font-medium tracking-wider mx-2 sm:mx-3">À votre service</span>
            <span className="h-px w-6 sm:w-8 bg-blue-400"></span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white font-carrois leading-tight">
            Contactez-nous
          </h2>

          {/* Subtitle in French/Arabic */}
          <p className="text-lg sm:text-xl md:text-2xl text-blue-400 mb-2 sm:mb-3 font-inter px-2">
            3ayet lina, seft lina, o ghadi nkouno m3ak mn lewel ta lekher.
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-inter px-4">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* WhatsApp Card */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-green-500/5 transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/10 mb-4 sm:mb-6 mx-auto">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 text-center font-carrois">Par WhatsApp</h3>

            {/* Description */}
            <p className="text-gray-300 mb-6 sm:mb-8 text-center font-inter text-sm sm:text-base leading-relaxed px-2">
              Contactez-nous directement via WhatsApp pour une réponse rapide et efficace.
            </p>

            {/* CTA Button */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:shadow-green-500/20 active:scale-95 font-carrois flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-green-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">Envoyer un message</span>
            </button>

            {/* Badge */}
            <div className="mt-4 sm:mt-6 text-center">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Réponse rapide
              </span>
            </div>
          </div>

          {/* Email Card */}
          <div
            ref={el => cardsRef.current[1] = el}
            className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl border border-white/10 shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-500/10 mb-4 sm:mb-6 mx-auto">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 text-center font-carrois">Par Email</h3>

            {/* Description */}
            <p className="text-gray-300 mb-6 sm:mb-8 text-center font-inter text-sm sm:text-base leading-relaxed px-2">
              Envoyez-nous un email pour toute demande d&apos;information ou projet détaillé.
            </p>

            {/* CTA Button */}
            <a
              href="mailto:kaztaouibadreddin@gmail.com"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:shadow-blue-500/20 active:scale-95 font-carrois flex items-center justify-center gap-2 sm:gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span className="relative z-10">Envoyer un email</span>
            </a>

            {/* Badge */}
            <div className="mt-4 sm:mt-6 text-center">
              <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Réponse détaillée
              </span>
            </div>
          </div>
        </div>

        {/* Additional Contact Info for Mobile */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8">
            <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 font-carrois">Informations de contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-gray-300">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="text-sm sm:text-base">+212 694 019 452</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-sm sm:text-base break-all">kaztaouibadreddin@gmail.com</span>
                </div>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-white/10">
                <p className="text-xs sm:text-sm text-gray-400">
                  Disponible 7j/7 pour répondre à vos questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};