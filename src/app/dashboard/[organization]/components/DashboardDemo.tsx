'use client';

import { Line, ResponsiveContainer, LineChart, XAxis } from 'recharts';
import { useMemo } from 'react';

import Tile from '~/core/ui/Tile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

export default function DashboardDemo() {
  const mrr = useMemo(() => generateDemoData(), []);
  const visitors = useMemo(() => generateDemoData(), []);
  const returningVisitors = useMemo(() => generateDemoData(), []);
  const churn = useMemo(() => generateDemoData(), []);
  const netRevenue = useMemo(() => generateDemoData(), []);
  const fees = useMemo(() => generateDemoData(), []);
  const newCustomers = useMemo(() => generateDemoData(), []);
  const tickets = useMemo(() => generateDemoData(), []);
  const activeUsers = useMemo(() => generateDemoData(), []);

  return (
    <div className={'flex flex-col space-y-6 pb-36'}>
      <div
        className={
          'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3' +
          ' 2xl:grid-cols-4'
        }
      >
        <Tile>
          <Tile.Heading>Monthly Recurring Revenue</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{`$${mrr[1]}`}</Tile.Figure>
              <Tile.Trend trend={'up'}>20%</Tile.Trend>
            </div>

            <Chart data={mrr[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Revenue</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{`$${netRevenue[1]}`}</Tile.Figure>
              <Tile.Trend trend={'up'}>12%</Tile.Trend>
            </div>

            <Chart data={netRevenue[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Fees</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{`$${fees[1]}`}</Tile.Figure>
              <Tile.Trend trend={'up'}>9%</Tile.Trend>
            </div>

            <Chart data={fees[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>New Customers</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{`${newCustomers[1]}`}</Tile.Figure>
              <Tile.Trend trend={'down'}>-25%</Tile.Trend>
            </div>

            <Chart data={newCustomers[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Visitors</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{visitors[1]}</Tile.Figure>
              <Tile.Trend trend={'down'}>-4.3%</Tile.Trend>
            </div>

            <Chart data={visitors[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Returning Visitors</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{returningVisitors[1]}</Tile.Figure>
              <Tile.Trend trend={'stale'}>10%</Tile.Trend>
            </div>

            <Chart data={returningVisitors[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Churn</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{churn[1]}%</Tile.Figure>
              <Tile.Trend trend={'up'}>-10%</Tile.Trend>
            </div>

            <Chart data={churn[0]} />
          </Tile.Body>
        </Tile>

        <Tile>
          <Tile.Heading>Support Tickets</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{tickets[1]}</Tile.Figure>
              <Tile.Trend trend={'up'}>-30%</Tile.Trend>
            </div>

            <Chart data={tickets[0]} />
          </Tile.Body>
        </Tile>
      </div>

      <div>
        <Tile>
          <Tile.Heading>Active Users</Tile.Heading>

          <Tile.Body>
            <div className={'flex justify-between'}>
              <Tile.Figure>{activeUsers[1]}</Tile.Figure>
              <Tile.Trend trend={'up'}>10%</Tile.Trend>
            </div>

            <Chart data={activeUsers[0]} />
          </Tile.Body>
        </Tile>
      </div>

      <div>
        <Tile>
          <Tile.Heading>Customers</Tile.Heading>

          <Tile.Body>
            <CustomersTable></CustomersTable>
          </Tile.Body>
        </Tile>
      </div>
    </div>
  );
}

function generateDemoData() {
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('en-us', {
    month: 'long',
    year: '2-digit',
  });

  const data: { value: string; name: string }[] = [];

  for (let n = 8; n > 0; n -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth() - n, 1);

    data.push({
      name: formatter.format(date) as string,
      value: (Math.random() * 10).toFixed(1),
    });
  }

  return [data, data[data.length - 1].value] as [typeof data, string];
}

function Chart(
  props: React.PropsWithChildren<{ data: { value: string; name: string }[] }>,
) {
  return (
    <div className={'h-36'}>
      <ResponsiveContainer width={'100%'} height={'100%'}>
        <LineChart width={400} height={100} data={props.data}>
          <Line
            className={'text-primary'}
            type="monotone"
            dataKey="value"
            stroke="currentColor"
            strokeWidth={2.5}
            dot={false}
          />

          <XAxis
            style={{ fontSize: 9 }}
            axisLine={false}
            tickSize={0}
            dataKey="name"
            height={15}
            dy={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomersTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>MRR</TableHead>
          <TableHead>Logins</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Pippin Oddo</TableCell>
          <TableCell>Pro</TableCell>
          <TableCell>$100.2</TableCell>
          <TableCell>920</TableCell>
          <TableCell>
            <Tile.Badge trend={'up'}>Healthy</Tile.Badge>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Väinö Pánfilo</TableCell>
          <TableCell>Basic</TableCell>
          <TableCell>$40.6</TableCell>
          <TableCell>300</TableCell>
          <TableCell>
            <Tile.Badge trend={'stale'}>Possible Churn</Tile.Badge>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Giorgos Quinten</TableCell>
          <TableCell>Pro</TableCell>
          <TableCell>$2004.3</TableCell>
          <TableCell>1000</TableCell>
          <TableCell>
            <Tile.Badge trend={'up'}>Healthy</Tile.Badge>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Adhelm Otis</TableCell>
          <TableCell>Basic</TableCell>
          <TableCell>$0</TableCell>
          <TableCell>10</TableCell>
          <TableCell>
            <Tile.Badge trend={'down'}>Churned</Tile.Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
