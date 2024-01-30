import React from 'react';

import AppHeader from '../components/AppHeader';
import Trans from '~/core/ui/Trans';
import { withI18n } from '~/i18n/with-i18n';

async function TasksLayout({
  children,
  params,
}: React.PropsWithChildren<{
  params: {
    task: string;
  },
}>) {

  return (
    <>
      <AppHeader
        title={<Trans i18nKey={'common:tasksTabLabel'} />}
        description={<Trans i18nKey={'common:tasksTabDescription'} />}
      />
      <div className={'w-full px-container flex flex-col flex-1'}>
        {children}
      </div>
    </>
  )
}

export default withI18n(TasksLayout);