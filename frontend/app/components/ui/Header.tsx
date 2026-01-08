'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Settings,
  Home,
  Sparkles,
  Diamond,
  Mail,
  Clock,
  Phone,
  Shield,
  Award,
  Calendar,
  Tag
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update current time in Asia/Kolkata explicitly
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        });
        setCurrentTime(timeString);
      } catch (e) {
        // fallback if timeZone not supported
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Products', href: '/products', icon: Tag },
    { name: 'Collections', href: '/categories', icon: Sparkles },
    { name: 'About Us', href: '/about', icon: Shield },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  // helper to detect active path (handles querystrings)
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/') || (href !== '/' && pathname?.startsWith(href));

  return (
    <>
      {/* Fixed Top Announcement Bar - responsive grid so items don't overlap */}
      <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 py-2">
            {/* Left: Trust indicators - allow wrapping on small screens */}
            <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">Trusted Since 1985</span>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium truncate">BIS Hallmarked Gold</span>
              </div>
            </div>

            {/* Right: Time and contact - center on mobile, right on desktop */}
            <div className="flex items-center justify-center sm:justify-end gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Open: {currentTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+911234567890" className="text-xs sm:text-sm hover:text-yellow-200 transition-colors font-medium">
                  +91 12345 67890
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - starts below announcement bar. top offset increased so it doesn't overlap when announcement bar wraps */}
      <header className={`fixed ${isScrolled ? 'top-14 sm:top-12' : 'top-14 sm:top-12'} w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-2xl border-b border-yellow-100'
          : 'bg-white border-b border-yellow-100'
      }`}>
        <div className="container mx-auto px-2 sm:px-4 lg:px-6">
          {/* Main Header Row - Adjusted layout */}
          <div className="flex items-center h-16 sm:h-18 lg:h-20">
            {/* Left: Logo and Name - Bigger logo and text */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-2 sm:space-x-3 group pt-1 sm:pt-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 ring-4 ring-yellow-200/50">
                    <Diamond className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full border-2 sm:border-3 border-white shadow-lg" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 tracking-tight font-serif leading-tight truncate">
                    Shree Shyam Jewellers
                  </span>
                  <span className="text-xs sm:text-xs lg:text-sm text-yellow-700 font-medium tracking-widest uppercase truncate">
                    Certified Luxury Jewelry
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Wider Search Box - Desktop */}
            <div className="hidden lg:flex flex-1 mx-6 xl:mx-8">
              <form onSubmit={handleSearch} className="w-full max-w-3xl xl:max-w-4xl mx-auto">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02] shadow-xl' : 'shadow-lg'}`}>
                  <input
                    type="text"
                    placeholder="Search diamonds, gold jewelry, engagement rings, necklaces, bracelets, earrings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full px-8 py-4 pl-16 bg-white border-2 border-yellow-300/80 rounded-2xl focus:outline-none focus:border-yellow-500 focus:ring-0 text-gray-800 placeholder-gray-500 transition-all duration-300 text-base"
                  />
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 flex items-center">
                    <Search className="w-6 h-6 text-yellow-600" />
                    <div className="ml-4 w-px h-7 bg-gradient-to-b from-yellow-300/50 to-transparent" />
                  </div>
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold text-base"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Right: User details - Right aligned with bigger icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-5 ml-auto">
              {/* Wishlist - Desktop */}
              <Link href="/wishlist" className="hidden md:block relative group">
                <div className="relative p-2.5 sm:p-3 rounded-xl hover:bg-amber-50/50 transition-all duration-300">
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7 lg:h-7 text-gray-600 group-hover:text-rose-500 transition-all duration-300" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                    5
                  </span>
                </div>
              </Link>

              {/* Cart - Bigger icon */}
              <Link href="/cart" className="relative group">
                <div className="relative p-2.5 sm:p-3 rounded-xl hover:bg-amber-50/50 transition-all duration-300">
                  <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 lg:w-7 lg:h-7 text-gray-600 group-hover:text-yellow-700 transition-all duration-300" />
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-sm">
                    2
                  </span>
                </div>
              </Link>

              {/* User Account / Login - Bigger icons */}
              {user ? (
                <div className="relative hidden md:block" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2.5 p-2 hover:bg-amber-50/50 rounded-xl transition-all duration-300 group"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                  >
                    <div className="relative">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-md text-base">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 truncate">{user.name}</span>
                      <span className="text-xs text-yellow-600">VIP Member</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${isUserMenuOpen ? 'rotate-180 text-yellow-700' : 'text-gray-500'}`} />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-amber-100/50 py-3 z-50 animate-in slide-in-from-top-5 duration-300">
                      <div className="px-4 py-3 border-b border-amber-100/30">
                        <div className="font-bold text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-lg mx-2 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-5 h-5 mr-3 text-yellow-700" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                        <Link
                          href="/orders"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-lg mx-2 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Package className="w-5 h-5 mr-3 text-yellow-700" />
                          <span className="font-medium">My Orders</span>
                        </Link>
                        <Link
                          href="/appointments"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-amber-50 rounded-lg mx-2 transition-colors duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Calendar className="w-5 h-5 mr-3 text-yellow-700" />
                          <span className="font-medium">Appointments</span>
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center px-4 py-3 text-yellow-700 hover:bg-amber-50 rounded-lg mx-2 transition-colors duration-200 border-t border-amber-100 mt-2 pt-2"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <Settings className="w-5 h-5 mr-3" />
                            <span className="font-medium">Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-lg mx-2 transition-colors duration-200 mt-2 border-t border-amber-100 pt-2"
                        >
                          <LogOut className="w-5 h-5 mr-3" />
                          <span className="font-medium">Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="px-4 py-2.5 text-gray-700 hover:text-yellow-800 font-medium rounded-xl hover:bg-amber-50/50 transition-all duration-300 text-base"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/appointment"
                    className="px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl hover:from-yellow-700 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base flex items-center"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Now
                  </Link>
                </div>
              )}

              {/* Mobile menu button - Bigger icon */}
              <button
                ref={mobileMenuButtonRef}
                className="md:hidden p-2.5 text-gray-600 hover:text-yellow-700 hover:bg-amber-50/50 rounded-xl transition-colors duration-300 ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Tabs - Desktop */}
          <div className="hidden lg:flex justify-center items-center py-3">
            <nav className="flex items-center space-x-8 xl:space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative py-3 transition-all duration-300 ${
                    isActive(item.href) ? 'text-yellow-800' : 'text-gray-700 hover:text-yellow-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isActive(item.href) ? 'text-yellow-700' : 'text-gray-500 group-hover:text-yellow-600'}`} />
                    <span className="font-semibold tracking-wide text-lg xl:text-xl font-serif">{item.name}</span>
                  </div>

                  {/* Hover line effect */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transition-all duration-300 ${
                    isActive(item.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`} />

                  {/* Active indicator */}
                  {isActive(item.href) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse ring-2 ring-yellow-200" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Search - Full responsive */}
          <div className="lg:hidden py-3 sm:py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search diamonds, gold jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 sm:py-4 pl-12 sm:pl-14 bg-white border-2 border-yellow-300 rounded-xl sm:rounded-2xl focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100 text-gray-800 placeholder-gray-500 shadow-sm transition-all duration-300 text-sm sm:text-base"
              />
              <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-lg sm:rounded-xl hover:from-yellow-700 hover:to-amber-700 transition-colors duration-300 text-sm sm:text-base font-medium shadow-sm"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile Navigation - Full responsive */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white rounded-2xl shadow-2xl border border-amber-100 mb-3 overflow-hidden" ref={mobileMenuRef}>
              <div className="py-3 sm:py-4">
                {/* Mobile Navigation Links */}
                <div className="space-y-1 px-3 sm:px-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl transition-all duration-300 ${
                        isActive(item.href) ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-yellow-800' : 'text-gray-700 hover:bg-amber-50/50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive(item.href) ? 'text-yellow-700' : 'text-gray-500'}`} />
                      <span className="font-semibold text-base sm:text-lg font-serif">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Quick Actions */}
                <div className="grid grid-cols-2 gap-3 px-3 sm:px-4 pt-4 sm:pt-5 mt-3 sm:mt-4 border-t border-amber-100">
                  <a
                    href="tel:+911234567890"
                    className="text-center bg-gray-900 text-white px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Call Now
                  </a>
                  <Link
                    href="/appointment"
                    className="text-center bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-md flex items-center justify-center text-sm sm:text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Book Now
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="flex space-x-3 px-3 sm:px-4 pt-4 sm:pt-5 mt-3 sm:mt-4 border-t border-amber-100 flex-col sm:flex-row">
                    <Link
                      href="/login"
                      className="w-full sm:flex-1 text-center bg-amber-50 text-yellow-800 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-amber-100 transition-colors duration-300 border border-amber-200 text-sm sm:text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="w-full sm:flex-1 text-center bg-gradient-to-r from-yellow-600 to-amber-600 text-white px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl font-semibold hover:from-yellow-700 hover:to-amber-700 transition-all duration-300 shadow-md text-sm sm:text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed headers - Responsive height. Increased to avoid overlap when announcement bar wraps to two lines on small screens */}
      <div className="h-28 sm:h-28 lg:h-32 xl:h-36" />
    </>
  );
}
