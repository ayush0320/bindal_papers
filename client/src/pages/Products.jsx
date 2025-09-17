import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductsGrid from '../components/ProductsGrid';
import { productService } from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const category = selectedCategory === 'all' ? null : selectedCategory;
        const response = await productService.getProducts(category);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'paper', name: 'Paper Industry', count: products.filter(p => p.category === 'paper').length },
    { id: 'sugar', name: 'Sugar Industry', count: products.filter(p => p.category === 'sugar').length }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Products & Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of high-quality paper products and 
            sustainable sugar industry solutions.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id
                      ? 'bg-white text-primary-600'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <ProductsGrid 
            products={products} 
            title={`${categories.find(c => c.id === selectedCategory)?.name || 'Products'}`}
          />
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 0V3m0 4h2m-2 0H8m0 0V3m0 4H6" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We offer tailored products and services to meet your specific requirements. 
            Contact our team to discuss your needs.
          </p>
          <a href="/contact" className="btn-primary">
            Get Custom Quote
          </a>
        </div>
      </div>
    </div>
  );
};

export default Products;