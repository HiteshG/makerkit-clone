import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/ui/table";
import { cn } from '@/lib/utils';

const TableCard = () => {
  return (
    <div className="flex flex-col space-y-3 rounded-lg border border-gray-100 dark:border-dark-900 bg-background p-5">
      <h6 className="scroll-m-20 font-heading text-base font-medium">
        <span className="font-normal text-gray-500 dark:text-gray-400">
          Customers
        </span>
      </h6>
      <div className="flex flex-col space-y-5">
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
                <Badge type="success">Healthy</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Väinö Pánfilo</TableCell>
              <TableCell>Basic</TableCell>
              <TableCell>$40.6</TableCell>
              <TableCell>300</TableCell>
              <TableCell>
                <Badge type="warning">Possible Churn</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Giorgos Quinten</TableCell>
              <TableCell>Pro</TableCell>
              <TableCell>$2004.3</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>
                <Badge type="success">Healthy</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Adhelm Otis</TableCell>
              <TableCell>Basic</TableCell>
              <TableCell>$0</TableCell>
              <TableCell>10</TableCell>
              <TableCell>
                <Badge type="danger">Churned</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const Badge = ({
  type,
  children,
} : {
  type: "success" | "warning" | "danger",
  children: React.ReactNode,
}) => {
  return (
    <div className={cn(
      "inline-flex items-center rounded-lg py-1 px-2.5 text-sm font-semibold justify-center",
      type === "success" && "bg-green-50 text-green-600 dark:bg-green-500/10",
      type === "warning" && "bg-yellow-50 text-yellow-600 dark:bg-yellow-500/10",
      type === "danger" && "bg-red-50 text-red-600 dark:bg-red-500/10",
    )}>
      {children}
    </div>
  )
}

export default TableCard;
