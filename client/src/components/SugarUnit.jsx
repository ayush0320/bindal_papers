import { Link } from 'react-router-dom';

const SugarUnit = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          {/* Image */}
          <div className="mb-8 lg:mb-0">
            <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/sugar-unit.svg"
                alt="Sugar & Distillery Unit"
                className="w-full h-64 lg:h-80 object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Sugar Industry
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Sugar & Distillery Unit
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our state-of-the-art sugar and distillery unit represents our commitment to 
              sustainable manufacturing and innovative processing technologies. We transform 
              raw materials into high-quality products while maintaining environmental responsibility.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Eco-Friendly Production:</span> Zero-waste manufacturing process
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">High Capacity:</span> Processing 1000+ tons daily
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                </div>
                <p className="ml-3 text-gray-700">
                  <span className="font-semibold">Quality Assured:</span> ISO certified production standards
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/products?category=sugar"
                className="btn-primary text-center"
              >
                Explore Sugar Products
              </Link>
              <Link
                to="/contact"
                className="btn-secondary text-center"
              >
                Request Information
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SugarUnit;