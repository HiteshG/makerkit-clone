import React from 'react';
import Alert from '@/core/ui/alert';
import { AlertCircle } from 'lucide-react';
import Pricing from '@/components/pricing/Pricing';

const index = () => {
  return (
    <div className="mt-4 flex h-full flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
      <div className="w-full">
        <div className="rounded-md dark:border-dark-800 w-full border border-transparent">
          <div className="flex flex-col space-y-0.5 px-container pt-container">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              Subscription
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your Subscription and Billing Settings
            </p>
          </div>
          <div className="flex flex-col p-container">
            <div className="flex flex-col space-y-6">
              <div className="mb-2">
                <Alert icon={<AlertCircle className="rounded-full h-5 w-5" />} type="info">
                  <p>{"Use the card 4242 4242 4242 4242 to successfully subscribe to a plan. Don't worry, it's a testing account."}</p>
                </Alert>
              </div>
              <Pricing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
