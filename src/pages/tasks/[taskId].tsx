import React from 'react';
import Layout from '@/core/layout';
import { Button } from '@/core/ui/button';
import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import TaskDetail from '@/components/tasks/TaskDetail';

const Detail = () => {
  return (
    <Layout
      title={
        <div className="flex items-center space-x-6">
          <h4 className="font-heading scroll-m-20 text-xl font-semibold tracking-tight">
            <span>Task</span>
          </h4>
          <Button variant={"ghost"} size={"sm"}>
            <Link href={"/tasks"} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
              <span className="flex w-full flex-1 items-center justify-center">
                <span className="flex space-x-2 items-center">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Tasks</span>
                </span>
              </span>
            </Link>
          </Button>
        </div>
      }
    >
      <TaskDetail />
    </Layout>
  );
}

export default Detail;
