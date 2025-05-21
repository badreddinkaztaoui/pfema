'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Contact = () => {
  const contactRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading and intro text animation
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        }
      });

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.3 + (index * 0.2),
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top center+=50',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '212694019452'; // Replace with your actual WhatsApp number
    const message = 'Bonjour, je suis intéressé par vos services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative py-28 bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 overflow-hidden"
    >
      {/* Abstract background shapes */}
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

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-2xl" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl" />
      <div className="absolute top-1/2 -translate-y-1/2 -left-12 w-24 h-80 bg-gradient-to-b from-blue-400/10 to-transparent blur-2xl rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="h-px w-8 bg-blue-400"></span>
            <span className="text-blue-400 uppercase text-sm font-medium tracking-wider mx-3">À votre service</span>
            <span className="h-px w-8 bg-blue-400"></span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white font-carrois">
            Contactez-nous
          </h2>

          <p className="text-xl text-blue-400 mb-3 font-inter">
            3ayet lina, seft lina, o ghadi nkouno m3ak mn lewel ta lekher.
          </p>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-inter">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* WhatsApp Card */}
          <div
            ref={el => cardsRef.current[0] = el}
            className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6 mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 text-center font-carrois">Par WhatsApp</h3>

            <p className="text-gray-300 mb-8 text-center font-inter">
              Contactez-nous directement via WhatsApp pour une réponse rapide et efficace.
            </p>

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:shadow-green-500/20 font-carrois flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-600 to-green-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
              <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">Envoyer un message</span>
            </button>

            {/* Responsive badge */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
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
            className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-6 mx-auto">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 text-center font-carrois">Par Email</h3>

            <p className="text-gray-300 mb-8 text-center font-inter">
              Envoyez-nous un email pour toute demande d&apos;information ou projet détaillé.
            </p>

            <a
              href="mailto:kaztaouibadreddin@gmail.com"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] hover:shadow-blue-500/20 font-carrois flex items-center justify-center gap-3 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-700 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></span>
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span className="relative z-10">Envoyer un email</span>
            </a>

            {/* Responsive badge */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Réponse détaillée
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};