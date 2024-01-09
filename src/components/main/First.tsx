import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const First = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="my-12 flex flex-col items-center md:flex-row lg:my-16 mx-auto flex-1 justify-center animate-in fade-in  duration-1000 slide-in-from-top-12">
        <div className="flex w-full flex-1 flex-col items-center space-y-8">
          <h2 className="inline-flex w-auto items-center space-x-2 rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400 dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm font-normal text-gray-500 dark:text-transparent shadow dark:shadow-dark-700">
            <span>The leading SaaS Starter Kit for ambitious developers</span>
          </h2>
          <h1 className="text-center text-4xl text-gray-600 dark:text-white md:text-5xl flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]">
            <span>The SaaS Solution for</span>
            <span className="bg-gradient-to-br bg-clip-text text-transparent from-primary-400 to-primary-700 leading-[1.2]">
              developers and founders
            </span>
          </h1>
          <h2>
            <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent text-center">
              <span>Here you can write a short description of your SaaS</span>
              <span>This subheading is usually laid out on multiple lines</span>
              <span>Impress your customers, straight to the point.</span>
            </span>
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <button className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:[&>*]:translate-y-0.5 [&>*]:py-2.5 [&>*]:px-6 h-14 text-lg rounded-full bg-transparent bg-gradient-to-r shadow-2xl hover:shadow-primary/60 from-primary to-primary-600 hover:to-indigo-600 text-white">
              <Link href={"/auth/sign-up"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                <span className="flex w-full flex-1 items-center justify-center">
                  <span className="flex items-center space-x-2">
                    <span>Get Started</span>
                    <ChevronDown className="h-4 w-4 -rotate-90 scale-100 transition-all ms-2" />
                  </span>
                </span>
              </Link>
            </button>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Free plan. No credit card required.
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-12 max-w-5xl mx-auto animate-in fade-in  duration-1000 slide-in-from-top-16 fill-mode-both delay-300">
        <Image
          className="shadow-[0_0_1000px_0] rounded-2xl shadow-primary/40 animate-in fade-in zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
          alt="App Image"
          fetchPriority="high"
          width={2688}
          height={1824}
          decoding="async"
          src={"/assets/images/dashboard-dark.webp"}
        />
      </div>
    </div>
  );
}

export default First;
