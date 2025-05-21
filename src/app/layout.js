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
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${inter.variable} ${carrois.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
