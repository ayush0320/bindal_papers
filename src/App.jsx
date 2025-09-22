import React from 'react'
import {
  Billing,
  Business,
  BusinessAlt,
  CardDeal,
  Clients,
  CTA,
  Footer,
  Hero,
  Navbar,
  Stats,
  Testimonials
} from './components'
import WaterSavings from "./components/calculators/WaterSavings";
import ChatBot from './components/ChatBot';
import styles from './style'

const App = () => {
  return (
    <div className='bg-primary w-full overflow-hidden'>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Bindals Sustainability</h1>
        <WaterSavings />
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <Business />
          <BusinessAlt />
          <Billing />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
          <Footer />
        </div>
      </div>
      <ChatBot />
    </div>
  )
}

export default App