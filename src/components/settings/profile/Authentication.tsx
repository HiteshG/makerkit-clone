import React from 'react';
import { Button } from '@/core/ui/button';
import { AlertCircle, AtSign, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Alert from '@/core/ui/alert';
import AvailableProvider from '@/components/auth/AvailableProvider';
import ConnectedProvider from '@/components/auth/ConnectedProvider';

const Authentication = () => {
  return (
    <div className="w-full lg:max-w-4xl">
      <div className="flex flex-col space-y-8">
        <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
          <div className="flex flex-col space-y-0.5 px-container pt-container">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              Authentication
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your connected accounts
            </p>
          </div>
          <div className="flex flex-col p-container">
            <div className="flex flex-col space-y-6">
              <div>
                <div className="mb-2">
                  <h5 className="scroll-m-20 font-heading text-lg font-medium">
                    <span className='font-medium'>
                      Connected Accounts
                    </span>
                  </h5>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Below are the accounts linked to your profile
                    </span>
                  </div>
                </div>
                <ConnectedProvider icon={<Image alt="google.com logo" fetchPriority="high" width="22" height="22" decoding="async" data-nimg="1" src="/assets/images/google.webp" />}>
                  Connected with Google.com
                </ConnectedProvider>
                <ConnectedProvider icon={<AtSign className="h-[22px] w-[22px]" />}>
                  Connected with Password
                </ConnectedProvider>
              </div>
              <div>
                <div className="mb-4">
                  <h5 className="scroll-m-20 font-heading text-lg font-medium">
                    <span className="font-medium">
                      Available Providers
                    </span>
                  </h5>
                  <p>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Click on the providers below to link your profile to the provider
                    </span>
                  </p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <div>
                    <div className="max-w-md">
                      <AvailableProvider icon={<Image alt="google.com logo" fetchPriority="high" width="22" height="22" decoding="async" data-nimg="1" src="/assets/images/google.webp" />}>
                        Connect with Google
                      </AvailableProvider>
                    </div>
                  </div>
                  <div>
                    <div className="max-w-md">
                      <AvailableProvider icon={<AtSign className="h-[22px] w-[22px]" />}>
                        Connect with Password
                      </AvailableProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
          <div className="flex flex-col space-y-0.5 px-container pt-container">
            <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
              Multi-Factor Authentication
            </h4>
            <p className="text-gray-500 dark:text-gray-400">
              Set up MFA via SMS
            </p>
          </div>
          <div className="flex flex-col p-container">
            <div className="flex flex-col space-y-4">
              <Alert icon={<AlertCircle className="rounded-full h-5 w-5" />} type="info">
                <h6>
                  <span className="text-base font-medium">
                    Secure your account with Multi-Factor Authentication
                  </span>
                </h6>
                <p>
                  Enable Multi-Factor Authentication to verify your identity for an extra layer of security to your account in case your password is stolen. In addition to entering your password, it requires you confirm your identity via SMS.
                </p>
              </Alert>
              <div className="flex flex-col space-y-3">
                <div>
                  <Alert icon={<ShieldCheck className="rounded-full h-5 w-5" />} type="warning">
                    <h6>
                      <span className="text-base font-medium">
                        Please verify your email to enable MFA
                      </span>
                    </h6>
                    <p>
                      Your email is not yet verified. Please verify your email to be able to set up Multi-Factor Authentication.
                    </p>
                  </Alert>
                </div>
                <div>
                  <Button>
                    <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                      <span className="flex w-full flex-1 items-center justify-center">
                        <span className="flex space-x-2">
                          <span>
                            Send Verification
                          </span>
                        </span>
                      </span>
                    </span>
                  </Button>
                </div>
              </div>
              <div>
                <Button>
                  <span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
                    <span className="flex w-full flex-1 items-center justify-center">
                      <span className="flex space-x-2">
                        <ShieldCheck className="h-5" />
                        <span>
                          Setup Multi-Factor Authentication
                        </span>
                      </span>
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
