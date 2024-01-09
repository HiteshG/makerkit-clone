import React from 'react';
import { User2Icon, Landmark, Users2, Brush, Box, File } from "lucide-react"

const Second = () => {
  return (
    <div className="container mx-auto px-5">
      <div className="flex flex-col items-center justify-center space-y-24 py-16">
        <div className="flex max-w-3xl flex-col items-center space-y-6 text-center">
          <h2 className="inline-flex w-auto items-center space-x-2 rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400 dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm font-normal text-gray-500 dark:text-transparent shadow dark:shadow-dark-700">
            <span>A modern, scalable, and secure SaaS Starter Kit</span>
          </h2>
          <div className="flex flex-col space-y-0.5">
            <h2 className="font-heading scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              The best tool in the space
            </h2>
            <h3>
              <span className="flex flex-col space-y-1 bg-gradient-to-br text-xl lg:text-2xl dark:from-white dark:via-gray-300 dark:to-gray-400 bg-clip-text text-gray-500 font-normal dark:text-transparent">
                Unbeatable Features and Benefits for Your SaaS Business
              </span>
            </h3>
          </div>
        </div>
        <div>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <User2Icon className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                Authentication
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Secure and Easy-to-Use Authentication for Your SaaS Website
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <Landmark className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                Multi-Tenancy
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Powerful Multi-Tenancy Features for Maximum Flexibility and Efficiency
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <Users2 className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                Team-Management
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Effortlessly Manage and Organize Your Team Members
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <Brush className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                UI Themes
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Customizable UI Themes to Match Your Brand and Style
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <Box className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                UI Components
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Pre-built UI Components to Speed Up Your Development
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex">
                <div className="rounded-xl bg-primary/5 p-4 dark:bg-background border border-primary/5 dark:border-dark-800">
                  <File className="h-5" />
                </div>
              </div>
              <div className="text-lg font-semibold">
                Blog and Documentation
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                Pre-built Blog and Documentation Pages to Help Your Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Second;
