import React from 'react';
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';

const Password = () => {
  return (
    <div className="w-full lg:max-w-4xl">
      <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
        <div className="flex flex-col space-y-0.5 px-container pt-container">
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            Password
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Update your password
          </p>
        </div>
        <div className="flex flex-col p-container">
          <form>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  Current Password
                  <Input />
                </label>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  New Password
                  <Input />
                </label>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                  Repeat New Password
                  <Input />
                </label>
              </div>
              <div>
                <Button>
                  <span>Update Password</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Password;
