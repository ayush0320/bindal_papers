import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Default product for demonstration if API fails
  const defaultProduct = {
    id: id,
    name: `Product ${id}`,
    category: 'paper',
    imageUrl: `/images/product-${id}.svg`,
    shortDesc: 'High-quality product for your business needs',
    longDesc: `This is a detailed description of Product ${id}. It features premium quality materials and innovative manufacturing processes that ensure durability and performance. Perfect for various applications in the ${id <= 5 ? 'paper' : 'sugar'} industry.`,
    specs: [
      'Premium quality materials',
      'ISO certified manufacturing',
      'Environmentally friendly',
      'Customizable options available',
      'Bulk quantities supported'
    ]
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  const displayProduct = product || defaultProduct;

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary-600">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/products" className="hover:text-primary-600">Products</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{displayProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={displayProduct.imageUrl}
                alt={displayProduct.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                displayProduct.category === 'paper' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {displayProduct.category === 'paper' ? 'Paper Industry' : 'Sugar Industry'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {displayProduct.name}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {displayProduct.shortDesc}
            </p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed">
                {displayProduct.longDesc}
              </p>
            </div>

            {/* Specifications */}
            {displayProduct.specs && displayProduct.specs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {displayProduct.specs.map((spec, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/contact"
                className="btn-primary text-center"
              >
                Request Quote
              </Link>
              <Link
                to="/products"
                className="btn-secondary text-center"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
            <p className="text-sm text-gray-600">ISO certified manufacturing with strict quality controls</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Quick turnaround times with reliable shipping</p>
          </div>

          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
            <p className="text-sm text-gray-600">Technical assistance and customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;