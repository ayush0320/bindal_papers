import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SugarUnit from '../components/SugarUnit';
import ProductsGrid from '../components/ProductsGrid';
import TestimonialSlider from '../components/TestimonialSlider';
import PartnersStrip from '../components/PartnersStrip';
import ContactForm from '../components/ContactForm';
import { bannerService, productService, testimonialService, partnerService } from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [paperProducts, setPaperProducts] = useState([]);
  const [sugarProducts, setSugarProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, paperRes, sugarRes, testimonialsRes, partnersRes] = await Promise.allSettled([
          bannerService.getBanners(),
          productService.getProducts('paper'),
          productService.getProducts('sugar'),
          testimonialService.getTestimonials(),
          partnerService.getPartners()
        ]);

        if (bannersRes.status === 'fulfilled') setBanners(bannersRes.value.data);
        if (paperRes.status === 'fulfilled') setPaperProducts(paperRes.value.data);
        if (sugarRes.status === 'fulfilled') setSugarProducts(sugarRes.value.data);
        if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data);
        if (partnersRes.status === 'fulfilled') setPartners(partnersRes.value.data);
      } catch (error) {
        console.error('Error fetching home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <Hero banners={banners} />

      {/* Sugar Unit Section */}
      <SugarUnit />

      {/* Paper Products Section */}
      <ProductsGrid 
        products={paperProducts.slice(0, 5)} 
        title="Our Paper Industry Products" 
        category="paper"
      />

      {/* Sugar Products Section */}
      <ProductsGrid 
        products={sugarProducts.slice(0, 3)} 
        title="Our Sugar Industry Products" 
        category="sugar"
      />

      {/* Testimonials Section */}
      <TestimonialSlider testimonials={testimonials} />

      {/* Partners Section */}
      <PartnersStrip partners={partners} />

      {/* Contact Teaser Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Contact us today to discuss your requirements and discover how Bindal Papers 
              can be your trusted partner for quality paper and sugar industry solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact" className="btn-primary">
                Contact Us Now
              </Link>
              <Link to="/products" className="btn-secondary">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;