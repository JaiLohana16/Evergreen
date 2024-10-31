import React from 'react'
import Title from "../components/Title"
import { assets } from '../assets/assets'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 borrder-t'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px]' src={assets.Hero} alt="about" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='m-2'>Welcome to <b>Evergreen Communication</b> Located in the heart of Tharparkar, Umerkot, Sindh, <b>Evergreen Communication</b> is proud to be the oldest and most successful wholesaler of mobile phones and accessories in the region. Established in 2012, we have dedicated ourselves to providing our customers with the latest technology and accessories at competitive prices.
          </p>
          <p className='m-2'>For over 12 years, we have built a reputation for reliability and excellence. Our extensive selection of products includes the latest smartphones, chargers, cases, and other accessories, catering to the diverse needs of our clientele. Whether you are a retailer or an individual looking for quality products, we have something for everyone.

          </p>
          <p className='m-2'>Our Commitment to Quality and Service
            At [Your Company Name], we believe that customer satisfaction is the cornerstone of our success. Our experienced team is dedicated to offering personalized service, ensuring that you find exactly what you need. We source our products directly from trusted manufacturers, guaranteeing quality and authenticity.</p>


          
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Experience:</b>
          <p className="text-gray-600">With decades of industry experience, we understand the needs of our customers and the ever-evolving mobile market.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Competitive Pricing:</b>
          <p className="text-gray-600"> We strive to offer the best prices without compromising on quality, making us a go-to wholesaler in the region.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience:</b>
          <p className="text-gray-600">With our new online store, you can browse and purchase from the comfort of your home, with fast and reliable shipping options.</p>
        </div>
      </div>
    </div>
  )
}

export default About
