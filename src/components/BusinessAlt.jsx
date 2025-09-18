import React from 'react'
import styles, { layout } from '../style'
import { star, shield, send } from '../assets'

const featuresAlt = [
    {
        id: 'feature-alt-1',
        icon: star,
        title:
            '2023 Bindals Sugar and distillery division – Launch',
        content:
            'In 2023, Bindals expanded its operations into the sugar industry with the launch of Bindals Sugar. This new venture added a diverse dimension to the group’s manufacturing capabilities.'
    },
    {
        id: 'feature-alt-2',
        icon: shield,
        title: '2024 and Beyond Continued Innovation and Expansion',
        content:
            'Technological expansion and innovation in sugar industry. Further advancements in sugar unit to achieve more production and best quality. Established a grain based ethanol plant with added production of ethanol round the year..'
    },

]

const FeatureCard = ({ icon, title, content, index }) => (
    <div
        className={`flex flex-row p-6 rounded-[20px] ${index !== featuresAlt.length - 1 ? 'mb-6' : 'mb-0'
            } feature-card`}
    >
        <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
            <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
        </div>
        <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
                {content}
            </p>
        </div>
    </div>
)

const BusinessAlt = () => {
    return (
        <section id="features-alt" className={layout.sectionReverse}>
            <div className={`${layout.sectionImgReverse} flex-col`}>
                {featuresAlt.map((feature, index) => (
                    <FeatureCard key={feature.id} {...feature} index={index} />
                ))}
            </div>
            <div className={layout.sectionInfo}>
                <h2 className={styles.heading2}>
                    Quality Products & Sustainable Solutions{' '}
                    <br className="sm:block hidden" />
                </h2>
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                    At Bindals Papers Mills Limited, we are a leading manufacturer and supplier
                    of high-quality Paper & Sugar products, with a commitment to sustainability
                    and innovation. Founded with a vision to promote environmental responsibility
                    while delivering superior Paper & Sugar solutions, we have steadily grown
                    to become one of the most trusted names in the Paper & Sugar industry.
                </p>
            </div>
        </section>
    )
}

export default BusinessAlt