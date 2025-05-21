'use client';

import { useRef, useEffect } from 'react';
import { CheckIcon, SparklesIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Consultation',
    id: 'tier-free',
    price: 'Gratuit',
    description: 'Commencez avec une consultation gratuite pour discuter de vos besoins.',
    features: [
      'Consultation initiale',
      'Évaluation basique du projet',
      'Conseils et orientation',
      'Support par email',
    ],
    cta: 'Nous contacter',
    mostPopular: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    accent: 'from-blue-400 to-indigo-500',
  },
  {
    name: 'Réalisation de Projet',
    id: 'tier-project',
    price: '999 MAD',
    description: 'Réalisation complète du projet avec une exécution professionnelle.',
    features: [
      'Tout ce qui est inclus dans la Consultation',
      'Implémentation complète du projet',
      'Support technique',
      'Gestion de projet',
      'Assurance qualité',
    ],
    cta: 'Commencer',
    mostPopular: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Projet + Rapport',
    id: 'tier-project-report',
    price: '1499 MAD',
    description: 'Réalisation complète du projet avec documentation détaillée.',
    features: [
      'Tout ce qui est inclus dans la Réalisation',
      'Rapport de projet complet',
      'Documentation technique',
      'Manuel utilisateur',
      'Guide de maintenance',
      'Support prioritaire',
    ],
    cta: 'Commencer',
    mostPopular: false,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    accent: 'from-purple-500 to-pink-600',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function PricingPage() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const router = useRouter();

  const handleContactClick = () => {
    router.push('/contact');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
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
            trigger: sectionRef.current,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-gray-950 to-gray-900 py-28 relative overflow-hidden">
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={handleBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:text-white border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Retour à l'accueil
        </button>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-1/3 w-96 h-96 rounded-full bg-blue-500/5 mix-blend-multiply blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-indigo-500/5 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-purple-500/5 mix-blend-multiply blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headerRef} className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
              <SparklesIcon className="mr-1.5 h-3 w-3 text-blue-400" />
              Tarification Transparente
            </span>
          </div>
          <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-wide">Tarifs</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Choisissez le plan qui vous convient
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
            Sélectionnez le plan parfait qui correspond à vos besoins et à votre budget. Tous les plans incluent notre engagement envers la qualité et l'excellence.
          </p>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={classNames(
                'flex flex-col relative isolate overflow-hidden',
                tier.mostPopular ? 'lg:z-10 lg:-mt-4 lg:-mb-4' : ''
              )}
            >
              <div className={classNames(
                'flex flex-col justify-between rounded-3xl bg-gray-800/50 backdrop-blur-sm p-8 ring-1 h-full shadow-lg transition-all duration-300 hover:shadow-xl',
                tier.mostPopular
                  ? 'ring-blue-500/30 lg:scale-105'
                  : 'ring-gray-700 hover:ring-blue-500/30'
              )}>
                {tier.mostPopular && (
                  <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <div className="flex items-center">
                      <div className={classNames(
                        "mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br",
                        tier.accent
                      )}>
                        <div className="text-white">{tier.icon}</div>
                      </div>
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? 'text-blue-400' : 'text-white',
                          'text-lg font-semibold leading-8'
                        )}
                      >
                        {tier.name}
                      </h3>
                    </div>

                    {tier.mostPopular ? (
                      <div className="rounded-lg bg-blue-500/10 px-3 py-1 w-fit text-xs font-semibold leading-5 text-blue-400">
                        Populaire
                      </div>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-gray-300">{tier.description}</p>

                  <div className="mt-6 bg-gray-900/50 -mx-8 px-8 py-4">
                    <p className="flex items-baseline gap-x-1">
                      <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                      {tier.price !== 'Gratuit' && (
                        <span className="text-sm font-semibold leading-6 text-gray-400">/projet</span>
                      )}
                    </p>
                  </div>

                  <ul role="list" className="mt-8 space-y-4 text-sm leading-6 text-gray-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3 items-start">
                        <CheckIcon className={classNames(
                          "h-5 w-5 flex-none",
                          tier.mostPopular ? "text-blue-400" : "text-blue-500"
                        )} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleContactClick}
                  className={classNames(
                    'mt-8 block w-full rounded-full px-4 py-3.5 text-center text-sm font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-300',
                    tier.mostPopular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:translate-y-[-2px]'
                      : 'bg-gray-800 text-blue-400 ring-1 ring-inset ring-gray-700 hover:ring-blue-500 hover:bg-gray-700/50 hover:translate-y-[-2px]'
                  )}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}