import React from 'react';
import { Button } from '@/core/ui/button';
import { Input } from '@/core/ui/input';
import { UploadCloud } from 'lucide-react';

const General = () => {
  return (
    <div className="w-full lg:max-w-4xl">
      <div className="flex flex-col space-y-8">
        <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
          <div className="flex flex-col space-y-0.5 px-container pt-container">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              General
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your Organization
            </p>
          </div>
          <div className="flex flex-col p-container">
            <form>
              <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                  <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                    Organization Name
                    <Input />
                  </label>
                </div>
                <div className="flex flex-col space-y-1">
                  <label className="w-full text-sm font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem]">
                    Organization Logo
                    <label className="relative cursor-pointer border-dashed outline-none ring-offset-2 transition-all focus:ring-2 ring-primary ring-offset-background flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <input className="hidden" name="photoURL" type="file" accept="image/*" />
                      <div className="flex items-center space-x-4">
                        <div className="flex">
                          <UploadCloud className="w-4 h-4" />
                        </div>
                        <div className="flex flex-auto">
                          <span className="w-full font-medium text-gray-500 dark:text-gray-400 [&>*]:mt-[0.35rem] cursor-pointer text-xs">
                            Click here to upload an image
                          </span>
                        </div>
                      </div>
                    </label>
                  </label>
                </div>
                <div>
                  <Button>
                    <span>
                      Update Organization
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
