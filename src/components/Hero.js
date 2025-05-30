'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const avatars = [
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670884442192-7b58d513cd55?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

export const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const navRef = useRef(null);
  const canvasRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '212694019452';
    const message = 'Bonjour, je suis intéressé par vos services.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePricingClick = () => {
    router.push('/pricing');
  };

  // Detect mobile and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse tracking for parallax effects (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Optimized particle animation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Reduce particles on mobile for better performance
    const particleCount = isMobile ? 30 : 100;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        speedY: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections (reduced on mobile)
      if (!isMobile) {
        particles.forEach((particle, i) => {
          particles.slice(i + 1).forEach(otherParticle => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            );

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isMobile]);

  // GSAP animations with mobile optimization
  useEffect(() => {
    setIsLoaded(true);

    const ctx = gsap.context(() => {
      // Staggered navigation animation
      gsap.from(navRef.current.children, {
        y: -50,
        opacity: 0,
        duration: isMobile ? 0.8 : 1,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.2
      });

      // Hero text animation
      const textElements = textRef.current.children;
      gsap.set(textElements, { y: isMobile ? 50 : 100, opacity: 0 });

      gsap.to(textElements, {
        y: 0,
        opacity: 1,
        duration: isMobile ? 1 : 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });

      // Floating elements parallax (desktop only)
      if (!isMobile) {
        floatingElementsRef.current.forEach((el, i) => {
          if (el) {
            gsap.to(el, {
              y: `${-20 + i * 10}px`,
              duration: 3 + i,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut'
            });
          }
        });

        // Mouse parallax effect
        const parallaxElements = document.querySelectorAll('.parallax-element');

        const updateParallax = () => {
          parallaxElements.forEach((el, i) => {
            const speed = (i + 1) * 0.02;
            gsap.to(el, {
              x: mousePosition.current.x * speed * 50,
              y: mousePosition.current.y * speed * 30,
              duration: 0.8,
              ease: 'power2.out'
            });
          });
        };

        gsap.ticker.add(updateParallax);
      }

      // Scroll-triggered animations
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(textRef.current, {
            y: self.progress * (isMobile ? -100 : -200),
            opacity: 1 - self.progress * 0.5,
            duration: 0.3
          });
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Animated particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Enhanced background with mesh gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />

        {/* Animated mesh gradient overlay */}
        <div
          className="absolute inset-0 opacity-40 md:opacity-60"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 90% 70%, rgba(245, 101, 101, 0.2) 0%, transparent 50%)
            `
          }}
        />

        {/* Floating geometric shapes (desktop only) */}
        {!isMobile && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                ref={el => floatingElementsRef.current[i] = el}
                className={`absolute parallax-element opacity-10 ${
                  i % 2 === 0 ? 'bg-blue-400' : 'bg-purple-400'
                }`}
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${15 + (i * 8)}%`,
                  width: `${20 + (i * 5)}px`,
                  height: `${20 + (i * 5)}px`,
                  borderRadius: i % 3 === 0 ? '50%' : '4px',
                  transform: `rotate(${i * 45}deg)`,
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Responsive glassmorphism navigation */}
      <nav ref={navRef} className="relative z-20 py-3 md:py-4 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/20">
                    <Image
                      src="/pfema-logo.png"
                      alt="PFEMA"
                      width={32}
                      height={32}
                      className="w-6 h-6 md:w-8 md:h-8 object-cover rounded-md md:rounded-lg"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                </div>
                <div>
                  <span className="text-white font-bold text-xl md:text-2xl font-carrois tracking-wider">PFEMA</span>
                  <div className="text-blue-300 text-xs font-medium hidden sm:block">Excellence & Innovation</div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {['À propos', 'Services', 'Contact'].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace('à ', ''))}
                    className="relative group cursor-pointer text-gray-300 hover:text-white transition-all duration-300 font-inter text-sm font-medium py-2 px-4 rounded-lg hover:bg-white/5"
                  >
                    {item}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}

                <button
                  onClick={() => scrollToSection('contact')}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 font-carrois group"
                >
                  <span className="relative z-10">Commencer</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 transition-all duration-200 active:scale-95"
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <div className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-full h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mt-4 pt-4 border-t border-white/10">
                <div className="flex flex-col space-y-3">
                  {['À propos', 'Services', 'Contact'].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase().replace('à ', ''))}
                      className="text-left text-gray-300 hover:text-white transition-all duration-300 font-inter text-base font-medium py-3 px-4 rounded-lg hover:bg-white/5 active:scale-95"
                    >
                      {item}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      scrollToSection('contact');
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 font-carrois mt-2"
                  >
                    Commencer maintenant
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero content with responsive typography and spacing */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4 md:px-6 -mt-16 md:-mt-24">
        <div ref={textRef} className="text-center max-w-6xl">
          {/* Premium badge */}
          <div className="mb-6 md:mb-8 inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-xl border border-blue-400/20 rounded-full shadow-lg shadow-blue-500/10">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 md:mr-3 animate-pulse" />
            <span className="text-blue-300 text-xs md:text-sm font-semibold font-inter tracking-wide">Excellence et innovation</span>
            <div className="ml-2 md:ml-3 text-blue-400">✨</div>
          </div>

          {/* Responsive main heading */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold mb-4 md:mb-6 font-carrois tracking-tight leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl share-tech-regular mb-3 md:mb-4 animate-pulse">
                Bienvenue chez
              </span>
              <span className="block relative">
                <span className="text-white font-carrois relative z-10">PFEMA</span>
                <div className="absolute inset-0 text-blue-400/20 font-carrois transform translate-x-1 translate-y-1 md:translate-x-2 md:translate-y-2 -z-10">PFEMA</div>
              </span>
            </h1>
          </div>

          {/* Responsive subtitle */}
          <div className="mb-8 md:mb-12 max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 font-inter leading-relaxed mb-3 md:mb-4 px-2">
              On est là pour t&apos;accompagner jusqu&apos;à la
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-semibold"> réussite </span>
              de ton projet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6 text-xs md:text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Solutions sur mesure</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>Support 24/7</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span>Innovation continue</span>
              </div>
            </div>
          </div>

          {/* Responsive CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12 px-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 active:scale-95 font-carrois"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Commencer maintenant</span>
                <div className="w-4 h-4 md:w-5 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300">→</div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </button>

            <button
              onClick={handlePricingClick}
              className="group w-full sm:w-auto backdrop-blur-xl bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl text-base md:text-lg font-medium transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 font-carrois"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Voir les tarifs</span>
                <div className="w-4 h-4 md:w-5 md:h-5 transform group-hover:rotate-45 transition-transform duration-300">💎</div>
              </span>
            </button>
          </div>

          {/* Responsive social proof indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 text-gray-400 text-xs md:text-sm">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="flex -space-x-1 md:-space-x-2">
                {[...Array(avatars.length)].map((_, i) => (
                  <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white/20">
                    <Image className="rounded-full w-full h-full object-cover" src={avatars[i]} alt="Client" width={50} height={50} />
                  </div>
                ))}
              </div>
              <span>50+ &eacute;tudients satisfaits</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span>4.9/5 étoiles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white/60 text-xs md:text-sm font-inter">Découvrir</div>
          <div className="w-6 h-10 md:w-8 md:h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden">
            <div className="w-0.5 h-2 md:w-1 md:h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full mt-2 animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading animation overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-400/20 border-t-blue-400 rounded-full animate-spin mb-4" />
            <div className="text-white font-carrois text-base md:text-lg">Chargement...</div>
          </div>
        </div>
      )}
    </section>
  );
};