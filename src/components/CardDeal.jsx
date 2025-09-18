import React from 'react'
import { card } from '../assets'
import styles, { layout } from '../style'

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Bindals ss maplitho paper<br className='sm:block hidden' /></h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Bindals SS Maplitho Paper is a high-quality uncoated wood-free printing paper known for its excellent surface finish, high bulk, and superior printability. Manufactured using advanced pulp processing and eco-friendly practices, it is designed to deliver consistent results across a wide range of printing and publishing applications
        </p>
      </div>
      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='card'
          className='w-[100%] h-[100%]'
        />
      </div>
    </section>
  )
}

export default CardDeal