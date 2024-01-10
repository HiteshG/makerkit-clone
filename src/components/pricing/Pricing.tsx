import React from 'react';
import { CheckCircle2 } from "lucide-react";
import { Button } from '../../core/ui/button';
import ProductCard from './ProductCard';
import configuration from '../../../configuration';

const Pricing = () => {
	const [period, setPeriod] = React.useState("Monthly");

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-12">
				<div className="flex justify-center">
					<div className="flex">
						<Button
							variant="outline"
							className={period === "Monthly" ? "focus:!ring-0 !outline-none rounded-r-none border-r-transparent text-primary-800 dark:text-primary-500 font-semibold hover:bg-background hover:text-initial" : "focus:!ring-0 !outline-none rounded-r-none hover:bg-gray-50 dark:hover:bg-background/80"}
							onClick={() => setPeriod("Monthly")}
						>
							<span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
								<span className="flex w-full flex-1 items-center justify-center">
									<span className="flex space-x-1.5 items-center">
										{period === "Monthly" && <CheckCircle2 className="w-5 h-5" />}
										<span>Monthly</span>
									</span>
								</span>
							</span>
						</Button>
						<Button
							variant="outline"
							className={period === "Yearly" ? "focus:!ring-0 !outline-none rounded-l-none border-l-transparent text-primary-800 dark:text-primary-500 font-semibold hover:bg-background hover:text-initial" : "focus:!ring-0 !outline-none rounded-l-none hover:bg-gray-50 dark:hover:bg-background/80"}
							onClick={() => setPeriod("Yearly")}
						>
							<span className="flex w-full h-full items-center transition-transform duration-500 ease-out">
								<span className="flex w-full flex-1 items-center justify-center">
									<span className="flex space-x-1.5 items-center">
										{period === "Yearly" && <CheckCircle2 className="w-5 h-5" />}
										<span>Yearly</span>
									</span>
								</span>
							</span>
						</Button>
					</div>
				</div>
				<div className="flex flex-col items-start space-y-6 lg:space-y-0 justify-center lg:flex-row lg:space-x-4">
					{configuration.stripe.products.map((product: any, index: number) => <ProductCard key={`productCard_${index}`} product={product} period={period} />)}
				</div>
			</div>
    </div>
  );
}

export default Pricing;
