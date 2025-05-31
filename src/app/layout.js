import { Poppins, Inter, Carrois_Gothic } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const carrois = Carrois_Gothic({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-carrois',
});

export const metadata = {
  title: {
    default: 'PFEMA - Solutions Digitales & Accompagnement Professionnel',
    template: '%s | PFEMA'
  },
  description: 'PFEMA vous accompagne de A à Z dans vos projets digitaux. Solutions sur mesure, développement web, consulting et support 24/7. Votre partenaire de confiance au Maroc.',
  keywords: [
    'PFEMA',
    'solutions digitales',
    'développement web',
    'consulting digital',
    'accompagnement projet',
    'partenaire technologique',
    'services numériques Maroc',
    'développement sur mesure',
    'transformation digitale',
    'support technique 24/7',
    'agence digitale Maroc',
    'développement mobile',
    'e-commerce',
    'applications web',
    'consulting IT'
  ],
  authors: [{ name: 'PFEMA', url: 'https://pfema.vercel.app' }],
  creator: 'PFEMA',
  publisher: 'PFEMA',
  category: 'Technology',
  classification: 'Business',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL('https://pfema.vercel.app'),

  alternates: {
    canonical: 'https://pfema.vercel.app',
    languages: {
      'fr-FR': 'https://pfema.vercel.app',
      'ar-MA': 'https://pfema.vercel.app/ar',
    },
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp)
  openGraph: {
    title: 'PFEMA - Solutions Digitales & Accompagnement Professionnel',
    description: 'Votre partenaire de confiance pour tous vos projets digitaux. Solutions sur mesure, développement web, consulting et support 24/7 au Maroc.',
    url: 'https://pfema.vercel.app',
    siteName: 'PFEMA',
    images: [
      {
        url: '/pfema-logo-og.png', // You need to create this 1200x630
        width: 1200,
        height: 630,
        alt: 'PFEMA - Solutions Digitales & Accompagnement Professionnel',
        type: 'image/png',
      },
      {
        url: '/pfema-logo.png', // Using your existing logo as fallback
        width: 800,
        height: 800,
        alt: 'PFEMA Logo',
        type: 'image/png',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
    countryName: 'Morocco',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PFEMA - Solutions Digitales & Accompagnement Professionnel',
    description: 'Votre partenaire de confiance pour tous vos projets digitaux. Solutions sur mesure, développement web, consulting et support 24/7.',
    images: ['/pfema-logo-og.png'], // You need to create this
    creator: '@pfema',
    site: '@pfema',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    bingBot: {
      index: true,
      follow: true,
    },
  },

  verification: {
    google: 'Dr8i1R5Ps73bZyWA9Fx_xReASdAIUaiCe2dxgwtmURE',
  },

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-icon-precomposed.png',
      },
    ],
  },

  manifest: '/manifest.json',

  other: {
    'geo.region': 'MA',
    'geo.country': 'Morocco',
    'geo.placename': 'Morocco',

    'contact': 'kaztaouibadreddin@gmail.com',
    'reply-to': 'kaztaouibadreddin@gmail.com',

    'business:contact_data:country_name': 'Morocco',
    'business:contact_data:email': 'kaztaouibadreddin@gmail.com',
    'business:contact_data:phone_number': '+212694019452',
    'business:contact_data:website': 'https://pfema.vercel.app',

    'theme-color': '#3B82F6',
    'msapplication-TileColor': '#3B82F6',
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-navbutton-color': '#3B82F6',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'PFEMA',

    'referrer': 'origin-when-cross-origin',

    'dns-prefetch': '//fonts.googleapis.com',
    'preconnect': 'https://fonts.gstatic.com',
  },

  appleWebApp: {
    title: 'PFEMA',
    statusBarStyle: 'default',
    capable: true,
  },
};

import EmailJsProvider from '@/components/EmailJsProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${inter.variable} ${carrois.variable} font-sans`}>
        <EmailJsProvider>
          {children}
        </EmailJsProvider>
      </body>
    </html>
  );
}
