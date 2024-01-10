import React from 'react';
import Layout from '@/core/layout';
import NewTask from '@/components/tasks/NewTask';
import TaskTable from '@/components/tasks/TaskTable';

const index = () => {
  return (
    <Layout title='Tasks' description={"Manage your Tasks and never lose track of your work."}>
      <div>
        <NewTask />
      </div>
      <TaskTable />
    </Layout>
  );
}

export default index;
