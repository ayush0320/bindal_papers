import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="max-w-md mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary w-full text-center"
          >
            Go Back Home
          </Link>
          <Link
            to="/products"
            className="btn-secondary w-full text-center"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need help? <Link to="/contact" className="text-primary-600 hover:text-primary-700">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;