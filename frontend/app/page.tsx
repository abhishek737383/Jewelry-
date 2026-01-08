'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Crown,
  Sparkles,
  Trophy,
  Shield,
  Truck,
  ShoppingBag,
  Package,
  Zap,
  Award,
  Gem,
  Diamond,
  Heart,
  Star,
  CheckCircle,
  Clock,
  Phone
} from 'lucide-react';
import { categoryApi } from './lib/api/categories';
import { productApi } from './lib/api/products';
import { sliderAPI, SliderImage } from './lib/api/slider';
import { Category } from '../types/category';
import { Product } from '../types/product';
import ProductCard from './components/shared/ProductCard';

// Skeleton Components
const SliderSkeleton = () => (
  <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8] bg-gradient-to-br from-yellow-50 to-amber-50 animate-pulse rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/20 to-transparent animate-shimmer"></div>
  </div>
);

const CategoryCardSkeleton = () => (
  <div className="group relative overflow-hidden rounded-full shadow-lg border border-yellow-200">
    <div className="relative h-64 md:h-72 lg:h-80 w-full bg-gradient-to-br from-yellow-100 via-amber-100 to-yellow-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
      <div className="h-8 w-3/4 bg-white/80 rounded-full animate-pulse mb-3 mx-auto"></div>
      <div className="h-4 w-1/2 bg-white/80 rounded-full animate-pulse mx-auto"></div>
    </div>
  </div>
);

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl border border-yellow-100 p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="h-48 bg-gradient-to-br from-yellow-50 to-amber-100 animate-pulse rounded-xl mb-4"></div>
    <div className="h-4 bg-yellow-100 rounded-full animate-pulse mb-2"></div>
    <div className="h-4 bg-yellow-100 rounded-full animate-pulse w-3/4 mb-3"></div>
    <div className="h-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-full animate-pulse w-1/2"></div>
  </div>
);

// Premium Slider Component with Fade Animation
const PremiumSlider = ({ 
  images, 
  current, 
  onNext, 
  onPrev, 
  onGoTo,
  isLoading 
}: { 
  images: SliderImage[];
  current: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <SliderSkeleton />;
  }

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8] bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-2xl">
            <div className="relative w-20 h-20 md:w-32 md:h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Diamond className="w-10 h-10 md:w-16 md:h-16 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 text-yellow-300 animate-spin" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-serif">
              Shree Shyam Jewellers
            </h2>
            <p className="text-yellow-100 text-lg md:text-xl mb-8 font-serif">
              Timeless Elegance Since 1985
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/collections"
                className="inline-flex items-center justify-center bg-white text-yellow-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-50 transition-all shadow-2xl hover:shadow-3xl group"
              >
                <Gem className="w-5 h-5 mr-3" />
                Explore Collections
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-[16/6] md:aspect-[21/8] lg:aspect-[24/8]">
        {images.map((image, index) => (
          <div
            key={image._id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.imageUrl}
                alt={image.altText}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={85}
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/40 via-yellow-800/30 to-transparent"></div>
            </div>
            
            {/* Premium Content Overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
                <div className="max-w-xl md:max-w-2xl">
                  {image.title && (
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl animate-fadeIn font-serif">
                      {image.title}
                    </h1>
                  )}
                  
                  {image.subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl text-yellow-100 mb-6 md:mb-8 max-w-lg leading-relaxed drop-shadow-lg animate-fadeIn delay-100 font-serif">
                      {image.subtitle}
                    </p>
                  )}
                  
                  {image.link && (
                    <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn delay-200">
                      <Link 
                        href={image.link}
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-yellow-900 rounded-full hover:bg-yellow-50 transition-all duration-300 font-bold text-base md:text-lg shadow-2xl hover:shadow-3xl group min-w-[180px] border border-yellow-200"
                      >
                        <Gem className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Shop Now
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
                      </Link>
                      <Link 
                        href="/collections"
                        className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300 font-bold text-base md:text-lg min-w-[180px]"
                      >
                        <Crown className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                        Collections
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Premium Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full p-3 md:p-4 hover:bg-white transition-all duration-300 z-20 group shadow-xl"
              aria-label="Previous slide"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-yellow-800 group-hover:scale-110 transition-transform rotate-180" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm border border-yellow-300 rounded-full p-3 md:p-4 hover:bg-white transition-all duration-300 z-20 group shadow-xl"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-yellow-800 group-hover:scale-110 transition-transform" />
            </button>
          </>
        )}

        {/* Premium Dots Indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onGoTo(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 ${
                  index === current 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-yellow-400 hover:bg-yellow-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default function HomePage() {
  const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  
  // Track loading states separately
  const [isSliderLoaded, setIsSliderLoaded] = useState(false);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [isProductsLoaded, setIsProductsLoaded] = useState(false);

  // Fetch data progressively
  const fetchInitialData = useCallback(async () => {
    try {
      // Step 1: Fetch slider images first
      try {
        const sliderResult = await sliderAPI.getSliderImages();
        if (sliderResult.success && sliderResult.data) {
          setSliderImages(sliderResult.data);
        }
      } catch (error) {
        console.error('Failed to load slider:', error);
      }
      setIsSliderLoaded(true);

      // Step 2: Fetch categories
      try {
        const categoriesData = await categoryApi.getAll();
        setCategories(categoriesData.filter(cat => cat.isActive));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
      setIsCategoriesLoaded(true);

      // Step 3: Fetch products in parallel
      try {
        const [featured, bestSeller, newArrival] = await Promise.all([
          productApi.getProducts({ limit: 8, isFeatured: true, isActive: true }),
          productApi.getProducts({ limit: 8, isBestSeller: true, isActive: true }),
          productApi.getProducts({ limit: 8, isActive: true, sortBy: 'createdAt', sortOrder: 'desc' })
        ]);
        
        // Set products directly from the API response
        setFeaturedProducts(featured.products);
        setBestSellerProducts(bestSeller.products);
        setNewArrivalProducts(newArrival.products);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
      setIsProductsLoaded(true);

    } catch (error) {
      console.error('Unexpected error:', error);
      // Still mark as loaded to show content
      setIsSliderLoaded(true);
      setIsCategoriesLoaded(true);
      setIsProductsLoaded(true);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Handle slider auto-rotation
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (sliderImages.length <= 1 || !isSliderLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [sliderImages.length, isSliderLoaded]);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % sliderImages.length);
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, [sliderImages.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const featuredCategories = categories
    .filter(cat => !cat.parentId)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-yellow-50/20 to-white">
      {/* IMPORTANT: Add margin-top equal to your header height */}
      <div className="mt-16 lg:mt-20">
        {/* Premium Slider Section with Fade Animation */}
        <PremiumSlider
          images={sliderImages}
          current={currentSlide}
          onNext={nextSlide}
          onPrev={prevSlide}
          onGoTo={goToSlide}
          isLoading={!isSliderLoaded}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          {/* Premium Collections Section - Circular Design */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-flex items-center justify-center mb-4 md:mb-6">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center shadow-2xl ring-4 ring-yellow-200/50">
                    <Gem className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
                </div>
                <div className="ml-4 md:ml-6 text-left">
                  <div className="flex items-center mb-1">
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                    <span className="text-yellow-700 font-bold text-sm md:text-base uppercase tracking-wider font-serif">Exclusive Collections</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
                    Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Collections</span>
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-serif">
                Discover our exclusive jewelry collections crafted with precision and passion
              </p>
            </div>

            {!isCategoriesLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))}
              </div>
            ) : featuredCategories.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {featuredCategories.map((category, index) => (
                  <div key={category._id} className="group relative">
                    <Link 
                      href={`/collections/${category.slug}`}
                      className="block relative overflow-hidden rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    >
                      <div className="relative h-64 md:h-72 lg:h-80 w-full overflow-hidden rounded-full">
                        {category.image ? (
                          <Image
                            src={typeof category.image === 'string' ? category.image : category.image.url || ''}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            priority={index < 2}
                            quality={85}
                            loading={index < 2 ? "eager" : "lazy"}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 rounded-full">
                            <div className="text-center">
                              <div className="text-6xl md:text-8xl font-bold text-yellow-300 mb-4">
                                {category.name.charAt(0)}
                              </div>
                              <span className="text-yellow-400 font-serif">Premium Collection</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 via-yellow-800/20 to-transparent rounded-full"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                        <div className="mb-4">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white drop-shadow-lg font-serif">
                            {category.name}
                          </h3>
                          
                          {category.description && (
                            <p className="text-yellow-100 text-sm md:text-base mb-4 max-w-2xl drop-shadow-lg line-clamp-2">
                              {category.description}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <span className="text-sm md:text-base font-semibold mr-3 text-white drop-shadow-lg font-serif">Explore</span>
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center group-hover:from-yellow-700 group-hover:to-amber-700 transition-all duration-300 shadow-lg">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>

                      {/* Premium Badge */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <div className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 text-white text-xs font-bold rounded-full shadow-xl">
                          <div className="flex items-center">
                            <Crown className="w-3 h-3 mr-1.5" />
                            Premium
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-300">
                <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <Gem className="w-10 h-10 md:w-12 md:h-12 text-yellow-300" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 font-serif">Premium Collections Coming Soon</h3>
                <p className="text-gray-600 max-w-md mx-auto font-serif">
                  We're curating amazing jewelry collections for you
                </p>
              </div>
            )}
          </section>

          {/* Featured Products */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full mr-3"></div>
                  <span className="text-yellow-700 font-bold text-sm md:text-base uppercase tracking-wider font-serif">Featured</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
                  Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600">Jewelry</span>
                </h2>
                <p className="text-gray-600 mt-1 font-serif">Handpicked premium jewelry selections</p>
              </div>
              {isProductsLoaded && featuredProducts.length > 0 && (
                <Link 
                  href="/collections?isFeatured=true" 
                  className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 px-5 md:px-6 py-3 rounded-full font-semibold text-yellow-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-yellow-200"
                >
                  View All
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl border-2 border-dashed border-yellow-300">
                <Award className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">Featured Jewelry Coming Soon</h3>
                <p className="text-gray-600 font-serif">Our premium selections are being curated</p>
              </div>
            )}
          </section>

          {/* Best Sellers */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full mr-3"></div>
                  <span className="text-amber-700 font-bold text-sm md:text-base uppercase tracking-wider font-serif">Bestsellers</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
                  Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">Sellers</span>
                </h2>
                <p className="text-gray-600 mt-1 font-serif">Most loved by our customers</p>
              </div>
              {isProductsLoaded && bestSellerProducts.length > 0 && (
                <Link 
                  href="/collections?isBestSeller=true" 
                  className="inline-flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100 px-5 md:px-6 py-3 rounded-full font-semibold text-amber-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-amber-200"
                >
                  View All
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : bestSellerProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {bestSellerProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl border-2 border-dashed border-amber-300">
                <Trophy className="w-16 h-16 md:w-20 md:h-20 text-amber-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">Best Sellers Coming Soon</h3>
                <p className="text-gray-600 font-serif">Discover what everyone loves</p>
              </div>
            )}
          </section>

          {/* New Arrivals */}
          <section className="mb-12 md:mb-16 lg:mb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3"></div>
                  <span className="text-yellow-700 font-bold text-sm md:text-base uppercase tracking-wider font-serif">New Arrivals</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-serif">
                  New <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">Arrivals</span>
                </h2>
                <p className="text-gray-600 mt-1 font-serif">Fresh additions to our collection</p>
              </div>
              {isProductsLoaded && newArrivalProducts.length > 0 && (
                <Link 
                  href="/collections?sort=newest" 
                  className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 px-5 md:px-6 py-3 rounded-full font-semibold text-yellow-900 transition-all duration-300 shadow-lg hover:shadow-xl group border border-yellow-200"
                >
                  View All
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {!isProductsLoaded ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : newArrivalProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newArrivalProducts.slice(0, 4).map((product) => (
                  <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-2 border-dashed border-yellow-300">
                <Zap className="w-16 h-16 md:w-20 md:h-20 text-yellow-300 mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 font-serif">New Arrivals Coming Soon</h3>
                <p className="text-gray-600 font-serif">Stay tuned for exciting new jewelry</p>
              </div>
            )}
          </section>

          {/* Premium Features - Circular Design */}
          {(isCategoriesLoaded || isProductsLoaded) && (
            <section className="mb-12 md:mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full p-8 border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="pt-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">BIS Certified</h3>
                    <p className="text-gray-600 text-sm font-serif">100% Hallmarked Gold</p>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full p-8 border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="pt-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Free Shipping</h3>
                    <p className="text-gray-600 text-sm font-serif">Across India</p>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full p-8 border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-600 to-amber-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="pt-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Lifetime Exchange</h3>
                    <p className="text-gray-600 text-sm font-serif">Easy Exchange Policy</p>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full p-8 border border-yellow-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl text-center group">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-600 to-yellow-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="pt-12">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">24/7 Support</h3>
                    <p className="text-gray-600 text-sm font-serif">Always Available</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Premium CTA */}
          {(isCategoriesLoaded || isProductsLoaded) && (
            <section>
              <div className="relative rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900"></div>
                <div className="relative z-10 p-8 md:p-12 text-center">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full shadow-2xl animate-pulse"></div>
                    <div className="absolute inset-4 bg-yellow-900 rounded-full flex items-center justify-center">
                      <Diamond className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-serif">
                    Discover Timeless Elegance
                  </h2>
                  <p className="text-yellow-100 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed font-serif">
                    Join thousands of families who trust Shree Shyam Jewellers since 1985.
                    Experience the perfect blend of tradition and craftsmanship.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                      href="/collections"
                      className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-yellow-900 font-bold rounded-full hover:bg-yellow-50 transition-all duration-300 shadow-2xl hover:shadow-3xl text-base md:text-lg group"
                    >
                      <Gem className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                      Explore Collections
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 md:ml-3 group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <a 
                      href="tel:+911234567890"
                      className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-base md:text-lg"
                    >
                      <Phone className="w-5 h-5 md:w-6 md:h-6 mr-2 md:mr-3" />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-spin {
          animation: spin 2s linear infinite;
        }
        
        .delay-100 {
          animation-delay: 0.1s;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </main>
  );
}