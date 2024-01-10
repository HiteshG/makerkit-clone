import React from 'react';
import { AppSidebar } from './appSidebar';
import MobileNavbar from './mobile-navbar';

const Layout = ({
  title,
  description,
  children,
} : {
  title?: React.ReactNode,
  description?: string,
  children?: React.ReactNode,
}) => {
  return (
    <div className="flex overflow-hidden">
      <AppSidebar />
      <div className="relative mx-auto flex flex-col h-screen w-full overflow-y-auto">
        <div className="flex items-start justify-between p-container">
          <div className="flex space-x-2 items-center lg:items-start lg:flex-col lg:space-x-0">
            <MobileNavbar />
            <h3 className="font-heading scroll-m-20 text-2xl font-semibold tracking-tight">
              <span className="flex items-center space-x-0.5 lg:space-x-2">
                <span className="font-semibold dark:text-white">
                  {title}
                </span>
              </span>
            </h3>
            <h5 className="scroll-m-20 font-heading text-lg font-medium hidden lg:block">
              <span className="dark:text-gray-400 text-gray-600 font-normal">
                {description}
              </span>
            </h5>
          </div>
        </div>
        <div className="w-full px-container flex flex-col flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;