import { Link } from 'react-router-dom';

const ProductsGrid = ({ products = [], title, category }) => {
  // Default products if none provided
  const defaultPaperProducts = [
    {
      id: 1,
      name: "Premium Writing Paper",
      category: "paper",
      imageUrl: "/images/product-1.svg",
      shortDesc: "High-quality writing paper for professional use"
    },
    {
      id: 2,
      name: "Newsprint Paper",
      category: "paper",
      imageUrl: "/images/product-2.svg",
      shortDesc: "Lightweight paper perfect for newspapers"
    },
    {
      id: 3,
      name: "Packaging Paper",
      category: "paper",
      imageUrl: "/images/product-3.svg",
      shortDesc: "Durable paper for packaging solutions"
    },
    {
      id: 4,
      name: "Art Paper",
      category: "paper",
      imageUrl: "/images/product-4.svg",
      shortDesc: "Smooth finish paper for printing applications"
    },
    {
      id: 5,
      name: "Cardboard",
      category: "paper",
      imageUrl: "/images/product-5.svg",
      shortDesc: "Strong cardboard for heavy-duty packaging"
    }
  ];

  const defaultSugarProducts = [
    {
      id: 6,
      name: "Bio Ethanol Fuel",
      category: "sugar",
      imageUrl: "/images/product-6.svg",
      shortDesc: "Eco-friendly biofuel from sugar processing"
    },
    {
      id: 7,
      name: "Bagasse",
      category: "sugar",
      imageUrl: "/images/product-7.svg",
      shortDesc: "Sustainable byproduct for various applications"
    },
    {
      id: 8,
      name: "Organic Fertilizer",
      category: "sugar",
      imageUrl: "/images/product-8.svg",
      shortDesc: "Natural fertilizer from sugar industry waste"
    }
  ];

  let displayProducts = products;
  if (products.length === 0) {
    if (category === 'paper') {
      displayProducts = defaultPaperProducts;
    } else if (category === 'sugar') {
      displayProducts = defaultSugarProducts;
    } else {
      displayProducts = [...defaultPaperProducts, ...defaultSugarProducts];
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="card group hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.category === 'paper' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {product.category === 'paper' ? 'Paper Industry' : 'Sugar Industry'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.shortDesc}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  Learn More
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {category && (
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="btn-primary"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;