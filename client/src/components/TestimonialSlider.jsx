import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

const TestimonialSlider = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default testimonials if none provided
  const defaultTestimonials = [
    {
      id: 1,
      author: "Rajesh Kumar",
      rating: 5,
      quote: "Bindal Papers has been our trusted partner for over 5 years. Their quality and reliability are unmatched in the industry. Highly recommended for any paper requirements.",
      company: "Kumar Printing Press"
    },
    {
      id: 2,
      author: "Priya Sharma",
      rating: 5,
      quote: "The sugar industry products from Bindal Papers have helped us achieve sustainable manufacturing goals. Their bio-ethanol fuel is of exceptional quality.",
      company: "Green Energy Solutions"
    },
    {
      id: 3,
      author: "Amit Patel",
      rating: 4,
      quote: "Excellent customer service and timely delivery. The packaging paper quality has improved our product presentation significantly.",
      company: "Patel Packaging Ltd"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Content */}
          <div className="text-center">
            {displayTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="mb-6">
                  <svg
                    className="w-12 h-12 text-primary-600 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center justify-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                <div>
                  <p className="font-semibold text-lg">{testimonial.author}</p>
                  {testimonial.company && (
                    <p className="text-gray-400">{testimonial.company}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {displayTestimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Dots indicator */}
          {displayTestimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-primary-600'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;