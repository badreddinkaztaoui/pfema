'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation with improved timing
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Stats animation
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top bottom-=80',
            toggleActions: 'play none none reverse'
          },
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        });
      }

      // Enhanced parallax effect for image
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8 // Smoother scrub effect
        },
        y: 70, // Slightly reduced movement for subtlety
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full"
             style={{
               backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
             }}
        />
      </div>

      {/* Decorative elements */}
      <div className="hidden lg:block absolute top-20 left-10 w-64 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
      <div className="hidden lg:block absolute bottom-20 right-10 w-64 h-1 bg-gradient-to-l from-purple-500 to-transparent rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div ref={contentRef} className="text-white lg:col-span-5 order-2 lg:order-1">
            <div className="inline-flex items-center mb-4">
              <span className="h-px w-8 bg-blue-400"></span>
              <span className="text-blue-400 uppercase text-sm font-medium tracking-wider mx-3">Notre histoire</span>
              <span className="h-px w-8 bg-blue-400"></span>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              <span className="block text-white">À propos de nous</span>
              <span className="text-blue-400 text-2xl mt-3 block font-normal"></span>
            </h2>

            <div className="space-y-6">
              <p className="text-xl mb-6 text-gray-300">
              Hna une équipe dyal lesjeunes passionnés par l&apos;innovation et la technologie.
                Nous sommes là pour transformer vos idées en réalité.
              </p>

              <p className="text-xl text-gray-300">
                M3a PFEMA, vous êtes entre de bonnes mains. Nous nous engageons à
                fournir des solutions de qualité qui répondent à vos besoins.
              </p>

              <button className="mt-3 inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group">
                <span className="font-medium">En savoir plus sur notre approche</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Stats row */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800"
            >
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">5+</div>
                <div className="text-sm text-gray-400">Années d&apos;expérience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">50+</div>
                <div className="text-sm text-gray-400">Projets réalisés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-1">100%</div>
                <div className="text-sm text-gray-400">Satisfaction client</div>
              </div>
            </div>
          </div>

          <div ref={imageRef} className="relative lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full lg:h-[500px] h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Image frame decoration */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-2xl z-0"></div>

              <div className="absolute inset-0 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                  alt="Team collaboration"
                  fill
                  className="object-cover transform -rotate-2 hover:rotate-0 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-600/20" />
              </div>

              {/* Floating badge */}
              <div className="absolute right-6 bottom-6 z-20 bg-black/60 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shadow-xl">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-blue-400 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-white font-medium">Équipe certifiée</span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute -top-2 -left-2 w-16 h-16 z-20">
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-80 rotate-45 transform origin-bottom-right"></div>
                <div className="absolute top-4 left-4 text-white font-bold">PFEMA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};