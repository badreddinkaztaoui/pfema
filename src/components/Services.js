'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Consultation",
    description: "Nsem3ou lik, nfhmouk, w n3tiwk l'best plan li kayn.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
  },
  {
    title: "Développement",
    description: "Code, design, rapport – kolchi b pro style.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
  },
  {
    title: "Support",
    description: "Maghadich tkoun bohdek, ghadi nmchiw m3ak hta l'soutenance.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
    icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
  }
];

export const Services = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/pricing');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current.children, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });

      // Cards animation with improved timing
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=80',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power2.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 relative bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full"
             style={{
               backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 w-80 h-80 rounded-full bg-indigo-500/5 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="max-w-2xl mx-auto text-center mb-20">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-px w-10 bg-blue-400 mr-3"></span>
            <span className="text-blue-400 uppercase text-sm font-medium tracking-wider">Services</span>
            <span className="h-px w-10 bg-blue-400 ml-3"></span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="block">Nos Services</span>
          </h2>
          <p className="text-blue-300 text-xl mb-3">Kifach ghadi n7awlo l&apos;idée dyalek l&apos;projet kammel</p>
          <p className="text-gray-400 text-sm">
            (On t&apos;aide à cadrer ton idée pour un projet solide dès le départ.)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              onClick={handleCardClick}
              className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden group border border-gray-800/50 cursor-pointer"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

                {/* Icon overlay on image */}
                <div className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-md p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>

                {/* Subtle call-to-action */}
                <div className="mt-6 flex items-center text-blue-400 text-sm font-medium">
                  <span>En savoir plus</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};