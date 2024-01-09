import React from 'react';
import Navbar from '@/core/navbar';
import Footer from '@/core/footer';
import Pricing from '@/components/pricing/Pricing';

const pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5">
        <div className="flex flex-col space-y-8 my-8">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
              Pricing
            </h1>
            <h2>
              <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
                Fair pricing for your customers
              </span>
            </h2>
          </div>
          <Pricing />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default pricing;
