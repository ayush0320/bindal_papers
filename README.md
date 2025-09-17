# Bindal Papers - MERN Marketing Website

A production-ready MERN (MongoDB, Express, React, Node.js) application that replicates a modern marketing website for Bindal Papers, featuring navigation, product catalogs, contact forms, and responsive design.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayush0320/bindal_papers.git
   cd bindal_papers
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Server (.env):**
   ```bash
   cp server/.env.example server/.env
   ```
   Edit `server/.env` with your configurations:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bindal_papers
   PORT=5000
   CORS_ORIGIN=http://localhost:5173
   
   # Optional: Email configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@bindalpapers.com
   EMAIL_TO=contact@bindalpapers.com
   ```

   **Client (.env):**
   ```bash
   cp client/.env.example client/.env
   ```
   Edit `client/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
bindal_papers/
├── client/                 # React frontend (Vite)
│   ├── public/
│   │   └── images/        # Placeholder images
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   └── utils/         # Utility functions
│   ├── .env.example       # Client environment variables template
│   └── package.json
├── server/                # Express backend
│   ├── models/           # Mongoose data models
│   ├── routes/           # API route handlers
│   ├── services/         # Business logic services
│   ├── scripts/          # Database seeding scripts
│   ├── middleware/       # Custom middleware
│   ├── .env.example      # Server environment variables template
│   └── package.json
├── seed/                 # Additional seed data and assets
├── package.json          # Root package.json with scripts
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Heroicons** - SVG icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **Express Rate Limit** - Rate limiting
- **Nodemailer** - Email sending (optional)
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - Document database

## 📄 Pages & Features

### Pages
- **Home** (`/`) - Main landing page with hero banner, product showcases, testimonials
- **About Us** (`/about`) - Company information and values
- **Products & Portfolio** (`/products`) - Product catalog with filtering
- **Product Detail** (`/products/:id`) - Individual product pages
- **News & Events** (`/news`) - Company news and upcoming events
- **Contact Us** (`/contact`) - Contact form and company information
- **Dealer Login** (`/dealer-login`) - Placeholder login page
- **404 Page** (`/*`) - Not found page

### Key Features
- **Responsive Design** - Mobile-first approach
- **Hero Carousel** - Rotating banner slides with navigation
- **Product Filtering** - Filter by category (paper/sugar industry)
- **Contact Form** - With validation and email notifications
- **Testimonial Slider** - Customer reviews carousel
- **Partner Showcase** - Client logo display
- **SEO Optimization** - Meta tags and semantic HTML

## 🔌 API Endpoints

### Banners
- `GET /api/banners` - Fetch hero banner slides

### Products
- `GET /api/products` - Fetch all products (supports ?category=paper|sugar)
- `GET /api/products/:id` - Fetch single product

### Testimonials
- `GET /api/testimonials` - Fetch customer testimonials

### Partners
- `GET /api/partners` - Fetch partner/client information

### Contact
- `POST /api/contact` - Submit contact form (rate-limited)

### Health
- `GET /api/health` - Server health check

## 📧 Email Configuration

The contact form can send email notifications when properly configured:

1. **Gmail Setup:**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password  # Generate from Google Account settings
   EMAIL_FROM=noreply@bindalpapers.com
   EMAIL_TO=contact@bindalpapers.com
   ```

2. **Other SMTP Providers:**
   Update the EMAIL_* variables according to your provider's settings.

**Note:** If email configuration is missing, contact forms will still be saved to the database but no emails will be sent.

## 🚀 Deployment

### Prerequisites for Production
- MongoDB Atlas account (or hosted MongoDB)
- Web hosting service (Heroku, Render, Vercel, etc.)

### Environment Setup for Production

**Server Environment Variables:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bindal_papers
PORT=5000
CORS_ORIGIN=https://your-frontend-domain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@bindalpapers.com
EMAIL_TO=contact@bindalpapers.com
```

**Client Environment Variables:**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Deployment Options

#### Option 1: Render (Recommended)
1. **Backend:** Deploy the `/server` folder as a Node.js service
2. **Frontend:** Deploy the `/client` folder as a static site
3. **Database:** Use MongoDB Atlas

#### Option 2: Heroku
1. **Backend:** Deploy server folder with MongoDB Atlas
2. **Frontend:** Deploy client folder or use Heroku static buildpack

#### Option 3: Vercel + Railway
1. **Frontend:** Deploy client folder to Vercel
2. **Backend:** Deploy server folder to Railway
3. **Database:** MongoDB Atlas

### Build Commands

**Client Build:**
```bash
cd client && npm run build
```

**Server Start:**
```bash
cd server && npm start
```

## 🧪 Development Scripts

**Root level:**
- `npm run dev` - Start both client and server in development mode
- `npm run client:dev` - Start only client development server
- `npm run server:dev` - Start only server with nodemon
- `npm run build` - Build both client and server for production
- `npm run seed` - Seed database with sample data
- `npm run install:all` - Install dependencies for root, client, and server

**Client specific:**
```bash
cd client
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

**Server specific:**
```bash
cd server
npm run dev        # Start with nodemon
npm start          # Start production server
npm run seed       # Seed database
```

## 📝 Data Models

### BannerSlide
```javascript
{
  title: String,
  subtitle: String,
  imageUrl: String,
  ctaText: String,
  ctaHref: String,
  order: Number,
  isActive: Boolean
}
```

### Product
```javascript
{
  name: String,
  category: ['paper', 'sugar'],
  imageUrl: String,
  shortDesc: String,
  longDesc: String,
  specs: [String],
  isActive: Boolean,
  featured: Boolean
}
```

### Testimonial
```javascript
{
  author: String,
  company: String,
  rating: Number (1-5),
  quote: String,
  isActive: Boolean,
  featured: Boolean
}
```

### Partner
```javascript
{
  name: String,
  logoUrl: String,
  website: String,
  description: String,
  isActive: Boolean
}
```

### ContactMessage
```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: ['new', 'read', 'responded', 'closed'],
  emailSent: Boolean
}
```

## 🔒 Security Features

- **Helmet** - Security headers
- **CORS** - Configured for specific origins
- **Rate Limiting** - Contact form protection
- **Input Validation** - Server-side validation with express-validator
- **Environment Variables** - Sensitive data protection

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation:** Responsive hamburger menu for mobile
- **Grids:** Adaptive product and content grids
- **Images:** Responsive images with proper aspect ratios

## 🎨 Design System

### Colors
- **Primary:** Blue shades (#0ea5e9, #0284c7, #0369a1)
- **Secondary:** Amber/Orange (#f59e0b, #d97706)
- **Neutral:** Gray scale for text and backgrounds

### Components
- **Buttons:** `.btn-primary`, `.btn-secondary`
- **Cards:** `.card` with hover effects
- **Forms:** Consistent styling with focus states

## ⚠️ Important Notes

- **Placeholder Assets:** Current images are SVG placeholders for demonstration
- **Email Service:** Optional - application works without email configuration
- **Database:** Requires MongoDB connection for full functionality
- **Trademarks:** Design assets are for demonstration purposes only

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error:**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   **Solution:** Ensure MongoDB is running locally or check your MONGODB_URI

2. **CORS Error:**
   ```
   Access to XMLHttpRequest has been blocked by CORS policy
   ```
   **Solution:** Check CORS_ORIGIN in server/.env matches your frontend URL

3. **Build Fails:**
   ```
   Module not found: Can't resolve '@heroicons/react'
   ```
   **Solution:** Run `npm install` in the client directory

4. **Seeding Fails:**
   ```
   Error: Cannot read property 'insertMany' of undefined
   ```
   **Solution:** Ensure MongoDB connection is established before seeding

## 📞 Support

For issues, questions, or contributions:
1. Check the troubleshooting section above
2. Create an issue in the GitHub repository
3. Contact the development team

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Note:** This is a demonstration application with placeholder content. In a production environment, ensure you have proper licensing for all assets and replace placeholder content with actual company information.