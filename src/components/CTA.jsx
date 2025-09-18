import React from 'react'
import styles from '../style'

const CTA = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex-1 flex flex-col'>
        <h2 className={styles.heading2}>The best choice for all your
          business needs</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Every pleasures is to welcomed pain avoided owing to the duty the obligations of business will frequently occur pleasures.
        </p>
      </div>
    </section>
  )
}

export default CTA