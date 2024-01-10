import React from 'react';
import Link from "next/link";
import { Button } from '@/core/ui/button';

const Complete = () => {
  return (
    <section className="mx-auto rounded-xl lg:p-16 fade-in bg-background animate-in slide-in-from-bottom-16 zoom-in-95 duration-1000 ease-out">
      <div className="flex flex-col space-y-8 items-center justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="w-16 bg-green-500 p-1 text-white rounded-full ring-8 ring-green-500/30 dark:ring-green-500/50">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
        </svg>
        <h3 className="font-heading scroll-m-20 text-2xl font-semibold tracking-tight">
          <span className="font-semibold mr-4">
            {"You're all set! You can now start using the app."}
          </span>
        </h3>
        <Button variant="outline">
          <Link href={"/dashboard"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center justify-center">
              <span className="flex space-x-2.5 items-center">
                <span>Continue to your Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
              </span>
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default Complete;
