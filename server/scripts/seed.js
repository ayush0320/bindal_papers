const mongoose = require('mongoose');
require('dotenv').config();

const BannerSlide = require('../models/BannerSlide');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const Partner = require('../models/Partner');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bindal_papers', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB for seeding');
  seedDatabase();
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await Promise.all([
      BannerSlide.deleteMany({}),
      Product.deleteMany({}),
      Testimonial.deleteMany({}),
      Partner.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Seed Banner Slides
    const bannerSlides = [
      {
        title: "Because Every Print",
        subtitle: "Deserves Perfection",
        imageUrl: "/images/hero-banner.svg",
        ctaText: "Explore Products",
        ctaHref: "/products",
        order: 1
      },
      {
        title: "Premium Quality",
        subtitle: "Paper Solutions",
        imageUrl: "/images/hero-banner.svg",
        ctaText: "Learn More",
        ctaHref: "/about",
        order: 2
      },
      {
        title: "Sustainable",
        subtitle: "Manufacturing",
        imageUrl: "/images/hero-banner.svg",
        ctaText: "Contact Us",
        ctaHref: "/contact",
        order: 3
      }
    ];

    await BannerSlide.insertMany(bannerSlides);
    console.log('Seeded banner slides');

    // Seed Products
    const products = [
      // Paper Products
      {
        name: "Premium Writing Paper",
        category: "paper",
        imageUrl: "/images/product-1.svg",
        shortDesc: "High-quality writing paper for professional use",
        longDesc: "Our premium writing paper is manufactured using the finest raw materials and advanced processing techniques. Perfect for corporate communications, official documents, and high-end printing applications. Features excellent opacity, smooth finish, and consistent quality.",
        specs: [
          "80-120 GSM weight options",
          "A4, A3, and custom sizes available",
          "Excellent ink absorption",
          "Acid-free composition",
          "ISO 9001 certified quality"
        ],
        featured: true
      },
      {
        name: "Newsprint Paper",
        category: "paper",
        imageUrl: "/images/product-2.svg",
        shortDesc: "Lightweight paper perfect for newspapers",
        longDesc: "Specially designed newsprint paper that offers excellent printability at competitive prices. Ideal for newspapers, magazines, and mass printing applications. Our newsprint ensures clear text reproduction and efficient ink coverage.",
        specs: [
          "45-48.8 GSM weight",
          "High opacity for minimal show-through",
          "Good ink absorption",
          "Cost-effective solution",
          "Bulk quantities available"
        ]
      },
      {
        name: "Packaging Paper",
        category: "paper",
        imageUrl: "/images/product-3.svg",
        shortDesc: "Durable paper for packaging solutions",
        longDesc: "Robust packaging paper designed for various packaging applications. Offers excellent strength, durability, and moisture resistance. Suitable for food packaging, industrial packaging, and protective wrapping.",
        specs: [
          "100-250 GSM weight range",
          "Food-grade options available",
          "Moisture resistant coating",
          "High tensile strength",
          "Recyclable and eco-friendly"
        ]
      },
      {
        name: "Art Paper",
        category: "paper",
        imageUrl: "/images/product-4.svg",
        shortDesc: "Smooth finish paper for printing applications",
        longDesc: "Premium art paper with superior coating for high-quality printing and graphic applications. Perfect for brochures, catalogs, magazines, and artistic prints. Delivers vibrant colors and sharp image reproduction.",
        specs: [
          "128-300 GSM weight options",
          "Gloss and matte finish available",
          "Excellent color reproduction",
          "Smooth surface texture",
          "Ideal for offset and digital printing"
        ],
        featured: true
      },
      {
        name: "Cardboard",
        category: "paper",
        imageUrl: "/images/product-5.svg",
        shortDesc: "Strong cardboard for heavy-duty packaging",
        longDesc: "Heavy-duty cardboard manufactured for packaging and structural applications. Provides excellent strength-to-weight ratio and can be customized for specific requirements. Ideal for boxes, displays, and industrial packaging.",
        specs: [
          "300-800 GSM weight range",
          "Single and double wall options",
          "Custom die-cutting available",
          "Water-resistant treatments",
          "Recyclable material"
        ]
      },
      // Sugar Products
      {
        name: "Bio Ethanol Fuel",
        category: "sugar",
        imageUrl: "/images/product-6.svg",
        shortDesc: "Eco-friendly biofuel from sugar processing",
        longDesc: "High-quality bio ethanol fuel produced as a byproduct of our sugar manufacturing process. This renewable fuel source helps reduce carbon emissions and supports sustainable energy initiatives. Suitable for various industrial applications.",
        specs: [
          "99.5% purity level",
          "Renewable energy source",
          "Low carbon footprint",
          "Industrial grade quality",
          "Bulk supply capabilities"
        ],
        featured: true
      },
      {
        name: "Bagasse",
        category: "sugar",
        imageUrl: "/images/product-7.svg",
        shortDesc: "Sustainable byproduct for various applications",
        longDesc: "Bagasse is the fibrous matter that remains after sugarcane crushing. This sustainable byproduct is used in paper manufacturing, building materials, and as a renewable energy source. An excellent example of our zero-waste manufacturing approach.",
        specs: [
          "High fiber content",
          "Moisture content < 50%",
          "Suitable for pulp production",
          "Biomass fuel applications",
          "Sustainable and renewable"
        ]
      },
      {
        name: "Organic Fertilizer",
        category: "sugar",
        imageUrl: "/images/product-8.svg",
        shortDesc: "Natural fertilizer from sugar industry waste",
        longDesc: "Premium organic fertilizer produced from sugar industry byproducts and waste materials. Rich in essential nutrients, this eco-friendly fertilizer improves soil health and crop yields while supporting sustainable agriculture practices.",
        specs: [
          "NPK balanced formulation",
          "Organic matter > 40%",
          "Slow-release nutrients",
          "Improves soil structure",
          "Environmentally safe"
        ]
      }
    ];

    await Product.insertMany(products);
    console.log('Seeded products');

    // Seed Testimonials
    const testimonials = [
      {
        author: "Rajesh Kumar",
        company: "Kumar Printing Press",
        rating: 5,
        quote: "Bindal Papers has been our trusted partner for over 5 years. Their quality and reliability are unmatched in the industry. Highly recommended for any paper requirements.",
        featured: true
      },
      {
        author: "Priya Sharma",
        company: "Green Energy Solutions",
        rating: 5,
        quote: "The sugar industry products from Bindal Papers have helped us achieve sustainable manufacturing goals. Their bio-ethanol fuel is of exceptional quality.",
        featured: true
      },
      {
        author: "Amit Patel",
        company: "Patel Packaging Ltd",
        rating: 4,
        quote: "Excellent customer service and timely delivery. The packaging paper quality has improved our product presentation significantly."
      },
      {
        author: "Dr. Meera Singh",
        company: "Agricultural Research Institute",
        rating: 5,
        quote: "The organic fertilizer from Bindal Papers has shown remarkable results in our field trials. It's truly a sustainable solution for modern agriculture."
      }
    ];

    await Testimonial.insertMany(testimonials);
    console.log('Seeded testimonials');

    // Seed Partners
    const partners = [
      {
        name: "Partner Company 1",
        logoUrl: "/images/product-1.svg",
        website: "https://example1.com",
        description: "Leading technology partner"
      },
      {
        name: "Partner Company 2",
        logoUrl: "/images/product-2.svg",
        website: "https://example2.com",
        description: "Manufacturing solutions provider"
      },
      {
        name: "Partner Company 3",
        logoUrl: "/images/product-3.svg",
        website: "https://example3.com",
        description: "Logistics and distribution partner"
      },
      {
        name: "Partner Company 4",
        logoUrl: "/images/product-4.svg",
        website: "https://example4.com",
        description: "Quality assurance partner"
      },
      {
        name: "Partner Company 5",
        logoUrl: "/images/product-5.svg",
        website: "https://example5.com",
        description: "Environmental solutions partner"
      },
      {
        name: "Partner Company 6",
        logoUrl: "/images/product-6.svg",
        website: "https://example6.com",
        description: "Research and development partner"
      }
    ];

    await Partner.insertMany(partners);
    console.log('Seeded partners');

    console.log('Database seeding completed successfully!');
    console.log('\nSummary:');
    console.log(`- ${bannerSlides.length} banner slides`);
    console.log(`- ${products.length} products`);
    console.log(`- ${testimonials.length} testimonials`);
    console.log(`- ${partners.length} partners`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};