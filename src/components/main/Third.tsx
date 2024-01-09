import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from '../../core/ui/button';
import { ChevronDown } from "lucide-react";

const Third = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-24">
          <div className="flex flex-col space-y-8 w-full lg:w-6/12">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <h2 className="font-heading scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Authentication
                </h2>
                <h3>
                  <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
                    Secure and Easy-to-Use Authentication for Your SaaS Website and API
                  </span>
                </h3>
              </div>
              <div>
                Our authentication system is built on top of the industry-leading PaaS such as Supabase and Firebase. It is secure, easy-to-use, and fully customizable. It supports email/password, social logins, and more.
              </div>
              <div>
                <Button variant="outline" className="rounded-full">
                  <Link href={"/auth/sign-up"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <span className="flex space-x-2 items-center">
                        <span>Get Started</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 scale-100 transition-all ms-2" />
                      </span>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full lg:w-6/12">
            <Image
              src={"/assets/images/sign-in.webp"}
              alt="Sign In"
              loading="lazy"
              width={1252}
              height={1366}
              decoding="async"
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-24">
          <div className="flex flex-col space-y-8 w-full lg:w-6/12">
            <Image
              className="rounded-2xl"
              src={"/assets/images/dashboard.webp"}
              alt="Dashboard"
              loading="lazy"
              width={1854}
              height={1558}
              decoding="async"
            />
          </div>
          <div className="flex w-full lg:w-6/12">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <h2 className="font-heading scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Dashboard
                </h2>
                <h2>
                  <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
                    A fantastic dashboard to manage your SaaS business
                  </span>
                </h2>
              </div>
              <div>
                Our dashboard offers an overview of your SaaS business. It shows at a glance all you need to know about your business. It is fully customizable and extendable.
              </div>
              <div>
                <Button variant="outline" className="rounded-full">
                  <Link href={"/auth/sign-up"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <span className="flex space-x-2 items-center">
                        <span>Get Started</span>
                        <ChevronDown className="h-4 w-4 -rotate-90 scale-100 transition-all ms-2" />
                      </span>
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

export default Third;
