import Link from 'next/link';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Shield,
  Award,
  Truck,
  CreditCard,
  Gem,
  Diamond,
  Sparkles,
  Crown
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    collections: [
      { name: 'Gold Jewelry', href: '/collections/gold' },
      { name: 'Diamond Jewelry', href: '/collections/diamond' },
      { name: 'Engagement Rings', href: '/collections/engagement-rings' },
      { name: 'Wedding Jewelry', href: '/collections/wedding' },
      { name: 'Necklaces', href: '/collections/necklaces' },
      { name: 'Bracelets', href: '/collections/bracelets' },
      { name: 'Earrings', href: '/collections/earrings' },
    ],
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'Collections', href: '/collections' },
      { name: 'Products', href: '/products' },
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Book Appointment', href: '/appointment' },
      { name: 'Track Order', href: '/orders' },
    ],
    policies: [
      { name: 'Privacy Policy', href: '/policy/privacy' },
      { name: 'Terms & Conditions', href: '/policy/terms' },
      { name: 'Return & Exchange', href: '/policy/returns' },
      { name: 'Shipping Policy', href: '/policy/shipping' },
      { name: 'Warranty Policy', href: '/policy/warranty' },
      { name: 'Gold Purity Guide', href: '/guide/gold-purity' },
      { name: 'Diamond Quality Guide', href: '/guide/diamond-quality' },
    ],
    services: [
      { name: 'Jewelry Cleaning', href: '/services/cleaning' },
      { name: 'Jewelry Repair', href: '/services/repair' },
      { name: 'Custom Design', href: '/services/custom' },
      { name: 'Jewelry Appraisal', href: '/services/appraisal' },
      { name: 'Gold Exchange', href: '/services/gold-exchange' },
      { name: 'Jewelry Insurance', href: '/services/insurance' },
      { name: 'Gift Certificates', href: '/gift-certificates' },
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-yellow-900 via-yellow-800 to-yellow-900 text-white">
      {/* Trust Badges */}
      <div className="bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">BIS Hallmarked</h4>
                <p className="text-yellow-100 text-xs">100% Certified Gold</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Free Shipping</h4>
                <p className="text-yellow-100 text-xs">Across India</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Secure Payment</h4>
                <p className="text-yellow-100 text-xs">100% Safe & Secure</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Trusted Since 1985</h4>
                <p className="text-yellow-100 text-xs">4 Generations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 rounded-full flex items-center justify-center shadow-xl ring-4 ring-yellow-200/50">
                  <Diamond className="w-6 h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300" />
              </div>
              <div>
                <Link href="/" className="text-2xl font-bold text-white font-serif">
                  Shree Shyam Jewellers
                </Link>
                <p className="text-yellow-300 text-sm font-serif tracking-wider">Certified Luxury Jewelry</p>
              </div>
            </div>
            
            <p className="text-yellow-100 mb-6 max-w-md font-serif">
              Since 1985, we have been crafting timeless jewelry pieces that celebrate life's special moments. 
              Our commitment to quality, craftsmanship, and customer satisfaction has made us a trusted name 
              in fine jewelry across generations.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">Main Market, City Center, Your City - 123456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <a href="tel:+911234567890" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                  +91 12345 67890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <a href="mailto:info@shreeshyamjewellers.com" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                  info@shreeshyamjewellers.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-100">Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-700 to-amber-700 flex items-center justify-center hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-700 to-amber-700 flex items-center justify-center hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-700 to-amber-700 flex items-center justify-center hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-700 to-amber-700 flex items-center justify-center hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center font-serif">
              <Gem className="w-5 h-5 mr-2 text-yellow-400" />
              Collections
            </h3>
            <ul className="space-y-2">
              {footerLinks.collections.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100 hover:text-yellow-300 transition-colors flex items-center group"
                  >
                    <Sparkles className="w-3 h-3 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center font-serif">
              <Crown className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100 hover:text-yellow-300 transition-colors flex items-center group"
                  >
                    <Sparkles className="w-3 h-3 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center font-serif">
              <Shield className="w-5 h-5 mr-2 text-yellow-400" />
              Policies
            </h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.policies.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100 hover:text-yellow-300 transition-colors flex items-center group"
                  >
                    <Sparkles className="w-3 h-3 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h3 className="text-lg font-bold text-white mb-4 flex items-center font-serif">
              <Award className="w-5 h-5 mr-2 text-yellow-400" />
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-yellow-100 hover:text-yellow-300 transition-colors flex items-center group"
                  >
                    <Sparkles className="w-3 h-3 mr-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-yellow-700">
          <h4 className="text-center text-lg font-semibold text-white mb-6 font-serif">We Accept</h4>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-white" />
              <span className="text-yellow-100 font-medium">Credit Cards</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <span className="text-yellow-100 font-medium">Debit Cards</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <span className="text-yellow-100 font-medium">UPI</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <span className="text-yellow-100 font-medium">Net Banking</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <span className="text-yellow-100 font-medium">Wallet</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-700 to-amber-700 rounded-lg flex items-center space-x-2">
              <span className="text-yellow-100 font-medium">COD</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-yellow-700">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
              <p className="text-yellow-100 text-sm font-serif">
                © {currentYear} Shree Shyam Jewellers. All rights reserved.
              </p>
              <p className="text-yellow-300 text-xs mt-1 font-serif">
                Crafting Timeless Memories Since 1985
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-yellow-100 text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <span className="text-yellow-100 text-sm">Pan-India Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <span className="text-yellow-100 text-sm">Certified Jewelry</span>
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-yellow-200/60 text-xs max-w-4xl mx-auto font-serif">
              Prices are subject to change based on gold and diamond rates. Images shown are for representation only. 
              Actual product may vary slightly. All jewelry is BIS hallmarked for purity assurance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}