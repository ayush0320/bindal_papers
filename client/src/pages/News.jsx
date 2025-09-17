const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Bindal Papers Expands Manufacturing Capacity",
      excerpt: "We are pleased to announce the expansion of our manufacturing facility with new state-of-the-art equipment.",
      date: "2024-01-15",
      category: "Company News",
      image: "/images/product-1.svg"
    },
    {
      id: 2,
      title: "New Sustainable Paper Line Launched",
      excerpt: "Introducing our eco-friendly paper products made from 100% recycled materials.",
      date: "2024-01-10",
      category: "Product Launch",
      image: "/images/product-2.svg"
    },
    {
      id: 3,
      title: "Industry Recognition for Quality Excellence",
      excerpt: "Bindal Papers receives prestigious quality award for manufacturing excellence.",
      date: "2024-01-05",
      category: "Awards",
      image: "/images/product-3.svg"
    },
    {
      id: 4,
      title: "Partnership with Local Sugar Farmers",
      excerpt: "New collaboration aims to support local agriculture while ensuring sustainable supply chain.",
      date: "2023-12-20",
      category: "Partnership",
      image: "/images/product-4.svg"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            News & Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and events from Bindal Papers.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {newsItems.map((item) => (
            <article key={item.id} className="card group hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {item.category}
                  </span>
                  <time className="text-sm text-gray-500">
                    {formatDate(item.date)}
                  </time>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {item.excerpt}
                </p>
                <button className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm">
                  Read More
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Upcoming Events
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Paper Industry Trade Show 2024
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Join us at the annual industry trade show where we'll showcase our latest products.
                  </p>
                  <p className="text-sm text-gray-500">
                    March 15-17, 2024 | Delhi
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Sustainability Workshop
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Learn about our eco-friendly manufacturing processes and sustainability initiatives.
                  </p>
                  <p className="text-sm text-gray-500">
                    April 5, 2024 | Online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-primary-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, product updates, and industry insights.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-secondary-500 hover:bg-secondary-600 px-6 py-3 rounded-r-lg font-medium transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;