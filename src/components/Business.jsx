import React from 'react'
import { features } from '../constants'
import styles, { layout } from '../style'

const FeatureCard = ({ icon, title, content, index }) => (
  <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? 'mb-6' : 'mb-0'} feature-card`}>
    <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
      <img
        src={icon}
        alt='icon'
        className='w-[50%] h-[50%] object-contain'
      />
    </div>
    <div className='flex-1 flex flex-col ml-3'>
      <h4 className='font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1'>
        {title}
      </h4>
      <p className='font-poppins font-normal text-dimWhite text-[16px] leading-[24px]'>
        {content}
      </p>
    </div>
  </div>
)

const Business = ({ reverse = false }) => {
  return (
    <section id='features' className={reverse ? layout.sectionReverse : layout.section}>
      {reverse ? (
        <>
          <div className={`${layout.sectionImgReverse} flex-col`}>
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} {...feature} index={index} />
            ))}
          </div>
          <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>About Company<br className='sm:block hidden' /></h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
              At Bindals Papers Mills Limited, we take pride in being a leading manufacturer and supplier of premium quality Paper and Sugar products. In 2023, Bindals expanded its operations into the sugar industry with the launch of Bindals Sugar. Driven by a vision for a greener future, our manufacturing processes are designed to minimize environmental impact while maximizing quality and efficiency. We utilize advanced technologies and eco-friendly practices to produce high-grade paper products that serve industries across publishing, packaging, and printing — all while conserving natural resources.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>About Company<br className='sm:block hidden' /></h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
              At Bindals Papers Mills Limited, we take pride in being a leading manufacturer and supplier of premium quality Paper and Sugar products. In 2023, Bindals expanded its operations into the sugar industry with the launch of Bindals Sugar. Driven by a vision for a greener future, our manufacturing processes are designed to minimize environmental impact while maximizing quality and efficiency. We utilize advanced technologies and eco-friendly practices to produce high-grade paper products that serve industries across publishing, packaging, and printing — all while conserving natural resources.
            </p>
          </div>
          <div className={`${layout.sectionImg} flex-col`}>
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} {...feature} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default Business