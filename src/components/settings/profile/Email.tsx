import React from 'react';
import Alert from '@/core/ui/alert';
import { ShieldCheck } from 'lucide-react';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';

const Email = () => {
  return (
    <div className="w-full lg:max-w-4xl">
      <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
        <div className="flex flex-col space-y-0.5 px-container pt-container">
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            Email
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Update your email address
          </p>
        </div>
        <div className="flex flex-col p-container">
          <div className="mb-2">
            <Alert icon={<ShieldCheck className="rounded-full h-5 w-5" />} type="warning">
              You cannot update your email because your account is not linked to any.
            </Alert>
          </div>
          <form>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  Your New Email
                  <Input />
                </label>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  Repeat Email
                  <Input />
                </label>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  Your Password
                  <Input />
                </label>
              </div>
              <div>
                <Button>
                  <span>Update Email Address</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Email;
