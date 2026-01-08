import type { Metadata } from 'next';
import './globals.css';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import { AuthProvider } from './components/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Shree Shyam Jewellers',
  description: 'Premium gold and diamond jewelry store. BIS Hallmarked gold, engagement rings, wedding jewelry, necklaces, bracelets, earrings. Trusted since 1985.',
  keywords: 'gold jewelry, diamond jewelry, BIS hallmarked, engagement rings, wedding jewelry, luxury jewelry, trusted jeweler',
  authors: [{ name: 'Shree Shyam Jewellers' }],
  openGraph: {
    title: 'Shree Shyam Jewellers - Certified Luxury Jewelry',
    description: 'Timeless jewelry pieces crafted with passion since 1985',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shree Shyam Jewellers',
    description: 'Certified Luxury Jewelry Since 1985',
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts for Elegant Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA */}
        <meta name="application-name" content="Shree Shyam Jewellers" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Shree Shyam Jewellers" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#D4AF37" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://shreeshyamjewellers.com" />
        
        {/* Structured Data / JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JewelryStore",
              "name": "Shree Shyam Jewellers",
              "image": "https://shreeshyamjewellers.com/logo.png",
              "description": "Certified Luxury Jewelry Since 1985",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Main Market",
                "addressLocality": "City Center",
                "addressRegion": "Your State",
                "postalCode": "123456",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 28.6139,
                "longitude": 77.2090
              },
              "url": "https://shreeshyamjewellers.com",
              "telephone": "+911234567890",
              "openingHours": "Mo-Sa 10:00-20:00, Su 11:00-19:00",
              "priceRange": "₹₹₹",
              "founder": {
                "@type": "Person",
                "name": "Shree Shyam"
              },
              "foundingDate": "1985",
              "sameAs": [
                "https://facebook.com/shreeshyamjewellers",
                "https://instagram.com/shreeshyamjewellers",
                "https://twitter.com/shreeshyamjewellers"
              ]
            })
          }}
        />
      </head>

      <body className="font-sans text-gray-800 antialiased bg-white">
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
        
        {/* WhatsApp Floating Button */}
        <a 
          href="https://wa.me/911234567890" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-green-500 to-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-bounce"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
          </svg>
        </a>
      </body>
    </html>
  );
}