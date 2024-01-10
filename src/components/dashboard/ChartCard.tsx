import { cn } from '@/lib/utils';
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis } from 'recharts';

const ChartCard = ({
  title,
  value,
  percent,
  type,
  icon,
  xKey,
  data
} : {
  title: string,
  value: string,
  percent: string,
  type: "success" | "warning" | "danger",
  icon: React.ReactNode,
  xKey: string,
  data: any[],
}) => {
  return (
    <div className="flex flex-col space-y-3 rounded-lg border border-gray-100 dark:border-dark-900 bg-background p-5">
      <h6 className="scroll-m-20 font-heading text-base font-medium">
        <span className="font-normal text-gray-500 dark:text-gray-400">
          {title}
        </span>
      </h6>
      <div className="flex flex-col space-y-5">
        <div className="flex justify-between">
          <div className="text-3xl font-bold">
            {value}
          </div>
          <div className={cn(
            "inline-flex items-center rounded-lg py-1 px-2.5 text-sm font-semibold justify-center",
            type === "success" && "bg-green-50 text-green-600 dark:bg-green-500/10",
            type === "warning" && "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10",
            type === "danger" && "bg-red-50 text-red-600 dark:bg-red-500/10",
          )}>
            <span>
              <span className="flex items-center space-x-1">
                {icon}
                <span>{percent}</span>
              </span>
            </span>
          </div>
        </div>
        <div className="h-36">
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{fontSize: "9px"}} minTickGap={0} />
              <Line className="text-primary" dot={false} type="monotone" dataKey="pv" stroke="currentColor" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartCard;
