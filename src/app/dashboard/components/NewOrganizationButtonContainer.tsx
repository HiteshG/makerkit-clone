'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import CardButton from '~/core/ui/CardButton';
import Trans from '~/core/ui/Trans';

import CreateOrganizationModal from '~/app/dashboard/[organization]/components/organizations/CreateOrganizationModal';
import CsrfTokenContext from '~/lib/contexts/csrf';

function NewOrganizationButtonContainer({
  csrfToken,
}: React.PropsWithChildren<{
  csrfToken: string;
}>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CsrfTokenContext.Provider value={csrfToken}>
      <CardButton onClick={() => setIsModalOpen(true)}>
        <span className={'flex items-center space-x-4'}>
          <PlusIcon className={'h-6 w-6'} />

          <span className={'text-base font-medium'}>
            <Trans i18nKey={'organization:createOrganizationDropdownLabel'} />
          </span>
        </span>
      </CardButton>

      <CreateOrganizationModal
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
      />
    </CsrfTokenContext.Provider>
  );
}

export default NewOrganizationButtonContainer;
