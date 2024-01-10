import React from 'react';
import Layout from '@/core/layout';
import ChartCard from '@/components/dashboard/ChartCard';
import { ArrowUp, ArrowDown, Equal } from 'lucide-react';
import TableCard from '@/components/dashboard/TableCard';

const index = () => {
  const data = [
    {
      name: 'June 23',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'July 23',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'August 23',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'September D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'October 23',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'November 23',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'December 23',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <Layout title='Dashboard' description={"An overview of your organization's activity and performance across all your projects."}>
      <div className="flex flex-col space-y-6 pb-36">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ChartCard
            title="Monthly Recurring Revenue"
            value="$9.7"
            percent="20%"
            icon={<ArrowUp />}
            type="success"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Revenue"
            value="$9.1"
            percent="12%"
            icon={<ArrowUp />}
            type="success"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Fees"
            value="$1.6"
            percent="12%"
            icon={<ArrowUp />}
            type="danger"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="New Customers"
            value="$9.1"
            percent="12%"
            icon={<ArrowDown />}
            type="danger"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Visitors"
            value="9.1"
            percent="-12%"
            icon={<ArrowDown />}
            type="danger"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Returning Visitors"
            value="$9.1"
            percent="12%"
            icon={<Equal />}
            type="warning"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Churn"
            value="$9.1"
            percent="12%"
            icon={<ArrowUp />}
            type="success"
            xKey="name"
            data={data}
          />
          <ChartCard
            title="Support Tickets"
            value="$9.1"
            percent="12%"
            icon={<ArrowDown />}
            type="danger"
            xKey="name"
            data={data}
          />
        </div>
        <div>
          <ChartCard
            title="Active Users"
            value="4.8"
            percent="10%"
            icon={<ArrowUp />}
            type="success"
            xKey="name"
            data={data}
          />
        </div>
        <div>
          <TableCard />
        </div>
      </div>
    </Layout>
  );
}

export default index;
