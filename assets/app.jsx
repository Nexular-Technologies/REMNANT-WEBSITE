import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Define custom colors based on main.css variables
const ACCENT_COLOR = '#37CACA'; // --accent-color (Teal/Cyan)
const HEADING_COLOR = '#A02A2A'; // --heading-color (Reddish-Brown)
const LIGHT_BACKGROUND = '#f7f7f7'; // Based on .light-background

// Utility component for rendering filled stars
const RatingStars = ({ rating }) => (
  <div className="flex mb-4">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

// --- Logo Carousel Component ---
const LogoCarousel = () => {
  const logos = [
    { name: 'BrightRock', color: HEADING_COLOR },
    { name: 'Sygnia', color: HEADING_COLOR },
    { name: 'Sasfin', color: HEADING_COLOR },
    { name: 'Sanlam', color: HEADING_COLOR },
    { name: 'Glacier', color: HEADING_COLOR },
    { name: 'Alexander Forbes', color: HEADING_COLOR },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logos.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + logos.length) % logos.length);
  }, [logos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % logos.length);
  }, [logos.length]);

  // Determine the visibility/opacity/position based on current index
  const getVisibleLogos = useCallback(() => {
    const visible = [];
    const step = 280; // Logo width (w-64) + spacing
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + logos.length) % logos.length;
      visible.push({
        ...logos[index], 
        position: i,
        scale: i === 0 ? 1 : (Math.abs(i) === 1 ? 0.8 : 0.6),
        opacity: i === 0 ? 1 : (Math.abs(i) === 1 ? 0.7 : 0.3),
        translateX: i * step,
      });
    }
    return visible;
  }, [currentIndex, logos]);


  return (
    <div className="relative w-full py-16 px-4 md:px-8 bg-white">
      {/* Title matching Heading/Accent Colors */}
      <h2 className="text-center text-4xl font-extrabold mb-12" style={{ color: HEADING_COLOR }}>
        OUR <span className="font-black" style={{ color: ACCENT_COLOR }}>PARTNERS</span>
      </h2>
      
      <div className="relative flex items-center justify-center h-32 md:h-40">
        
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          aria-label="Previous Partner"
          className="absolute left-0 lg:left-[5%] z-20 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-100 transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" style={{ color: HEADING_COLOR }} />
        </button>

        {/* Logo Display Area */}
        <div className="relative w-full max-w-5xl h-full flex items-center justify-center overflow-hidden">
          {getVisibleLogos().map((logo, idx) => {
            return (
              <div
                key={logo.name} 
                className="absolute transition-all duration-700 ease-in-out"
                style={{
                  transform: `translateX(${logo.translateX}px) scale(${logo.scale})`,
                  opacity: logo.opacity,
                  visibility: logo.opacity > 0.1 ? 'visible' : 'hidden', 
                  pointerEvents: logo.position === 0 ? 'auto' : 'none',
                }}
              >
                <div 
                  className="w-64 h-24 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-xl"
                  style={{ transform: logo.position === 0 ? 'scale(1.05)' : 'scale(1)' }}
                >
                  <div
                    className="text-2xl font-extrabold tracking-widest uppercase"
                    style={{ color: logo.color }}
                  >
                    {logo.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          aria-label="Next Partner"
          className="absolute right-0 lg:right-[5%] z-20 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-100 transition-all active:scale-95"
        >
          <ChevronRight className="w-6 h-6" style={{ color: HEADING_COLOR }} />
        </button>
      </div>

      {/* Navigation Dots (using Accent Color) */}
      <div className="flex justify-center gap-2 mt-12">
        {logos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to logo ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 shadow-inner' : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            style={{ backgroundColor: idx === currentIndex ? ACCENT_COLOR : undefined }}
          />
        ))}
      </div>
    </div>
  );
};

// --- Testimonial Carousel Component ---
const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Ltd',
      role: 'CEO',
      quote: 'Working with this team has been transformative for our business. Their expertise and dedication are unmatched, leading to substantial growth.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      company: 'Global Solutions Inc',
      role: 'CTO',
      quote: 'Outstanding service and results. They delivered beyond our expectations and continue to be a valuable partner in our strategic planning.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Emily Rodriguez',
      company: 'Creative Ventures',
      role: 'Director',
      quote: 'The professionalism and attention to detail are exceptional. Highly recommend their services to anyone looking for reliable financial advice.',
      rating: 5,
      image: '👩‍💻'
    },
    {
      name: 'David Thompson',
      company: 'Momentum Capital',
      role: 'Managing Partner',
      quote: 'A game-changer for our operations. Their innovative approach and strategic thinking set them apart from all their competitors.',
      rating: 5,
      image: '👨‍💻'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Increased interval for reading testimonials
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    // Uses a light background color for contrast
    <div className="relative w-full py-16 px-4 md:px-8" style={{ backgroundColor: LIGHT_BACKGROUND }}>
      {/* Title matching Heading/Accent Colors */}
      <h2 className="text-center text-4xl font-extrabold mb-12" style={{ color: HEADING_COLOR }}>
        CLIENT <span className="font-black" style={{ color: ACCENT_COLOR }}>TESTIMONIALS</span>
      </h2>
      
      <div className="relative flex items-center justify-center min-h-[450px]">
        
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          aria-label="Previous Testimonial"
          className="absolute left-4 md:left-8 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-100 transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" style={{ color: HEADING_COLOR }} />
        </button>

        <div className="relative w-full max-w-2xl h-full flex items-center justify-center overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ 
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${testimonials.length * 100}%`
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="min-w-[calc(100% / 4)] p-4"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div 
                  // Uses Accent Color for border-t-4
                  className="h-full flex flex-col bg-white rounded-2xl shadow-2xl p-8 border-t-4 hover:shadow-3xl transition-shadow duration-300" 
                  style={{ borderColor: ACCENT_COLOR }}
                >
                  
                  <div className="flex items-start mb-6">
                    <div className="text-5xl mr-4 flex-shrink-0">{testimonial.image}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                      {/* Uses Accent Color for company name */}
                      <p className="text-sm font-semibold" style={{ color: ACCENT_COLOR }}>{testimonial.company}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <RatingStars rating={testimonial.rating} />
                  
                  <blockquote className="text-gray-700 italic leading-relaxed text-lg flex-grow">
                    <p>"{testimonial.quote}"</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          aria-label="Next Testimonial"
          className="absolute right-4 md:right-8 z-10 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:bg-gray-100 transition-all active:scale-95"
        >
          <ChevronRight className="w-6 h-6" style={{ color: HEADING_COLOR }} />
        </button>
      </div>

      {/* Navigation Dots (using Accent Color) */}
      <div className="flex justify-center gap-2 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 shadow-inner' : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            style={{ backgroundColor: idx === currentIndex ? ACCENT_COLOR : undefined }}
          />
        ))}
      </div>
    </div>
  );
};


export default function App() {
  return (
    <div 
      className="min-h-screen antialiased" 
      // Set global font and background from main.css variables
      style={{ fontFamily: "Lato, sans-serif", backgroundColor: '#ffffff' }}
    >
      <header 
        className="py-4 text-center text-2xl font-bold border-b" 
        style={{ borderColor: LIGHT_BACKGROUND, color: HEADING_COLOR }}
      >
        Carousel Showcase
      </header>
      <LogoCarousel />
      <TestimonialCarousel />
    </div>
  );
}