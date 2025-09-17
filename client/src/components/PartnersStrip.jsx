const PartnersStrip = ({ partners = [] }) => {
  // Default partners if none provided
  const defaultPartners = [
    {
      id: 1,
      name: "Partner Company 1",
      logoUrl: "/images/product-1.svg",
      website: "#"
    },
    {
      id: 2,
      name: "Partner Company 2",
      logoUrl: "/images/product-2.svg",
      website: "#"
    },
    {
      id: 3,
      name: "Partner Company 3",
      logoUrl: "/images/product-3.svg",
      website: "#"
    },
    {
      id: 4,
      name: "Partner Company 4",
      logoUrl: "/images/product-4.svg",
      website: "#"
    },
    {
      id: 5,
      name: "Partner Company 5",
      logoUrl: "/images/product-5.svg",
      website: "#"
    },
    {
      id: 6,
      name: "Partner Company 6",
      logoUrl: "/images/product-6.svg",
      website: "#"
    }
  ];

  const displayPartners = partners.length > 0 ? partners : defaultPartners;

  return (
    <section className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We collaborate with industry leaders to deliver excellence and innovation
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {displayPartners.map((partner) => (
            <div
              key={partner.id}
              className="group transition-all duration-300 hover:scale-105"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4"
              >
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-16 w-auto mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Animated logos for larger screens */}
        <div className="hidden lg:block mt-16">
          <div className="overflow-hidden">
            <div className="flex animate-scroll">
              {[...displayPartners, ...displayPartners].map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 mx-8"
                >
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-12 w-auto filter grayscale opacity-50"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PartnersStrip;