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
  title: 'PFEMA',
  description: 'PFEMA - Votre partenaire de confiance',
  keywords: ['PFEMA', 'entreprise', 'partenaire', 'confiance', 'services'],
  authors: [{ name: 'PFEMA' }],
  creator: 'PFEMA',
  publisher: 'PFEMA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pfema.vercel.app'),
  openGraph: {
    title: 'PFEMA - Votre partenaire de confiance',
    description: 'PFEMA - Votre partenaire de confiance pour tous vos besoins',
    url: 'https://pfema.vercel.app',
    siteName: 'PFEMA',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'PFEMA - Votre partenaire de confiance',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PFEMA - Votre partenaire de confiance',
    description: 'PFEMA - Votre partenaire de confiance pour tous vos besoins',
    images: ['/og.png'],
    creator: '@pfema',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Dr8i1R5Ps73bZyWA9Fx_xReASdAIUaiCe2dxgwtmURE',
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
