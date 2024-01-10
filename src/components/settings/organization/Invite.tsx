import React from 'react';
import Link from "next/link";
import InviteForm from '@/components/onboarding/InviteForm';
import { Button } from '@/core/ui/button';
import { ArrowLeft } from 'lucide-react';

const Invite = () => {
  return (
    <div className="w-full lg:max-w-4xl">
      <div className="rounded-md dark:border-dark-800 w-full border border-gray-100">
        <div className="flex flex-col space-y-0.5 px-container pt-container">
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            Invite Members
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Invite members to your organization
          </p>
        </div>
        <div className="flex flex-col p-container">
          <InviteForm onSubmit={() => {}}>
            <div className="flex">
              <Button>
                <span>Send Invites</span>
              </Button>
            </div>
          </InviteForm>
        </div>
      </div>
      <div className="mt-4">
        <Button variant={"ghost"} size={"sm"}>
          <Link href={"/settings/organization/members"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center justify-center">
              <span className="flex items-center space-x-1">
                <ArrowLeft className="h-3" />
                <span>Go back to members</span>
              </span>
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Invite;
