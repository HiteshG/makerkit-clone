import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Button from '~/core/ui/Button';
import { PageHeader } from '~/core/ui/Page';
import Trans from '~/core/ui/Trans';

function AdminHeader({ children }: React.PropsWithChildren) {
  return (
    <PageHeader title={children}>
      <Button variant={'ghost'} href={'/dashboard'}>
        <span className={'flex space-x-2.5 items-center'}>
          <ArrowLeftIcon className={'w-4 h-4'} />

          <span>
            <Trans i18nKey={'admin:backToApp'} />
          </span>
        </span>
      </Button>
    </PageHeader>
  );
}

export default AdminHeader;
