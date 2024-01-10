import React from 'react';
import Link from "next/link";
import { Navbar } from '@/core/navbar';
import { Button } from '@/core/ui/button';

const Error404 = () => {
  return (
    <div>
      <Navbar />
      <div className="m-auto flex min-h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col space-y-8">
          <div className="flex space-x-8 divide-x divide-gray-100 dark:divide-gray-700">
            <div>
              <span className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
                <span className="text-primary">404</span>
              </span>
            </div>
            <div className="flex flex-col space-y-4 pl-8">
              <div className="flex flex-col space-y-2">
                <div>
                  <h1 className="font-heading scroll-m-20 text-4xl font-bold tracking-tight dark:text-white">
                    Sorry, the page was not found
                  </h1>
                  <p className="text-gray-500 dark:text-gray-300 mt-2">
                    Apologies, the page you were looking for was not found
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button variant="secondary">
                  <Link href={"/"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      Contact Us
                    </span>
                  </Link>
                </Button>
                <Button>
                  <Link href={"/"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      Back to Home Page
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
