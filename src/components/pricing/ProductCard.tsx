import React from 'react';
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from '../../core/ui/button';
import Link from "next/link";
import { cn } from '@/lib/utils';

const ProductCard = ({
  product,
  period,
} : {
  product: any,
  period: string,
}) => {
  let planIndex = product?.plans.findIndex((plan: any) => plan?.name === period);

  return (
    <div className={cn(
      "relative flex w-full flex-col justify-between space-y-6 rounded-xl p-6 lg:w-4/12 xl:p-8 2xl:w-3/12 xl:max-w-xs border-2",
      product?.recommended ? "border-primary" : "border-gray-100 dark:border-dark-900"
    )}>
      <div className="flex flex-col space-y-2.5">
        <div className="flex items-center space-x-6">
          <h3 className="font-heading scroll-m-20 text-2xl font-semibold tracking-tight">
            <b className="font-semibold">
              {product?.name}
            </b>
          </h3>
          {product?.badge && <div className={cn("rounded-md py-1 px-2 text-xs font-medium flex space-x-1", product?.recommended ? "bg-primary text-primary-foreground" : "bg-gray-50 text-gray-500 dark:text-gray-800")}>
            {product?.recommended && <Sparkles className="w-4 h-4" />}
            <span>
              {product.badge}
            </span>
          </div>}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {product?.description}
        </span>
      </div>
      <div className="flex items-end space-x-1">
        <div className="animate-in duration-500 slide-in-from-left-4 fade-in">
          <span className="text-2xl font-bold lg:text-3xl xl:text-4xl">
            {product?.plans[planIndex !== -1 ? planIndex : 0]?.price}
          </span>
        </div>
        {planIndex !== -1 && <div className="text-lg lowercase text-gray-500 dark:text-gray-400">
          <span>/</span>
          <span>{product?.plans[planIndex]?.name}</span>
        </div>}
      </div>
      <div className="text-current">
        <ul className="flex flex-col space-y-2">
          {product?.features?.map((plan: string, index: number) => <li key={`${product?.name}_plan_${index}`} className="flex items-center space-x-3 font-medium">
            <div>
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {plan}
            </span>
          </li>)}
        </ul>
      </div>
      <div className="bottom-0 left-0 w-full p-0">
        <Button
          variant={product?.recommended ? "default" : "outline"}
          className="w-full"
        >
          <Link href={planIndex !== -1 ? "/auth/sign-up" : product?.plans[0]?.href} className="flex w-full h-full items-center transition-transform duration-500 ease-out">
            <span className="flex w-full flex-1 items-center justify-center">
              {planIndex !== -1 ? "Get Started" : product?.plans[0]?.label}
            </span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
