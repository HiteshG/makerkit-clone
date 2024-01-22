import React from 'react';

import AppHeader from '../components/AppHeader';

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
        title={"Tasks"}
        description={"Manage your Tasks and never lose track of your work."}
      />
      <div className={'w-full px-container flex flex-col flex-1'}>
        {children}
      </div>
    </>
  )
}

export default TasksLayout;