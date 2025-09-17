import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Hero = ({ banners = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Default banners if none provided
  const defaultBanners = [
    {
      id: 1,
      title: "Because Every Print",
      subtitle: "Deserves Perfection",
      imageUrl: "/images/hero-banner.svg",
      ctaText: "Explore Products",
      ctaHref: "/products"
    },
    {
      id: 2,
      title: "Premium Quality",
      subtitle: "Paper Solutions",
      imageUrl: "/images/hero-banner.svg",
      ctaText: "Learn More",
      ctaHref: "/about"
    },
    {
      id: 3,
      title: "Sustainable",
      subtitle: "Manufacturing",
      imageUrl: "/images/hero-banner.svg",
      ctaText: "Contact Us",
      ctaHref: "/contact"
    }
  ];

  const slides = banners.length > 0 ? banners : defaultBanners;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="hero-gradient h-full flex items-center justify-center relative">
              <div className="text-center text-white z-10 px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  {slide.subtitle}
                </p>
                <a
                  href={slide.ctaHref}
                  className="inline-block bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;