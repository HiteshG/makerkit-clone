import React from 'react';
import Link from "next/link";
import { Input } from '@/core/ui/input';
import { Button } from '@/core/ui/button';

const Footer = () => {
  return (
    <div className="py-8 lg:py-24">
      <div className="container mx-auto px-5">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex w-full space-x-2 lg:w-4/12 xl:w-3/12 xl:space-x-6 2xl:space-x-5">
            <div className="flex flex-col space-y-4">
              <div className="text-2xl text-primary-600">
                MakerKit
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add a short tagline about your product
                </p>
              </div>
              <div className="flex text-xs text-gray-500 dark:text-gray-400">
                <p>{`© Copyright ${new Date().getFullYear()} Awesomely . All Rights Reserved.`}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-6 xl:space-x-16 2xl:space-x-20 w-full lg:flex-row lg:justify-end">
            <div>
              <div className="flex flex-col space-y-4">
                <p>
                  <span className="semi-bold">Product</span>
                </p>
                <ul className="flex flex-col space-y-4 text-gray-500 dark:text-gray-400">
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/#"}>Documentation</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/blog"}>Help Center</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/contact"}>Changelog</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <p>
                  <span className="semi-bold">Legal</span>
                </p>
                <ul className="flex flex-col space-y-4 text-gray-500 dark:text-gray-400">
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/#"}>Terms of Service</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/blog"}>Privacy Policy</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/contact"}>Cookie Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-4">
                <p>
                  <span className="semi-bold">About</span>
                </p>
                <ul className="flex flex-col space-y-4 text-gray-500 dark:text-gray-400">
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/#"}>Who we are</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/blog"}>Blog</Link>
                  </li>
                  <li className="text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800 dark:[&>a]:hover:text-white">
                    <Link href={"/contact"}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="font-semibold">
                  Subscribe to our Newsletter
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Get the latest updates from our team.
                </div>
              </div>
              <div>
                <form className="flex w-full flex-col justify-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-1.5">
                  <Input
                    type="email"
                    name="email address"
                    placeholder="your@email.com"
                    required
                  />
                  <Button>
                    <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                      <span className="flex w-full flex-1 items-center justify-center">
                        Subscribe
                      </span>
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
