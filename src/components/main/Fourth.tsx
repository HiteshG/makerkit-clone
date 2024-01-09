import React from 'react';
import Pricing from '../pricing/Pricing';

const Fourth = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center justify-center py-16 space-y-16">
        <div className="flex flex-col items-center space-y-8 text-center">
          <h2 className="inline-flex w-auto items-center space-x-2 rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400 dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm font-normal text-gray-500 dark:text-transparent shadow dark:shadow-dark-700">
            <span>
              Get started for free. No credit card required. Cancel anytime.
            </span>
          </h2>
          <div className="flex flex-col space-y-2.5">
            <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
              Ready to take your SaaS business to the next level?
            </h1>
            <h2>
              <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
                Get started on our free plan and upgrade when you are ready.
              </span>
            </h2>
          </div>
        </div>
        <Pricing />
      </div>
    </div>
  );
}

export default Fourth;
