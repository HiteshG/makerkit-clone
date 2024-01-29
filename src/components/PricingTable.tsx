'use client';

import { useState } from 'react';
import classNames from 'clsx';
import { CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';

import configuration from '~/configuration';

interface CheckoutButtonProps {
  readonly stripePriceId?: string;
  readonly recommended?: boolean;
}

interface PricingItemProps {
  selectable: boolean;
  product: {
    name: string;
    features: string[];
    description: string;
    recommended?: boolean;
    badge?: string;
  };
  plan: {
    name: string;
    stripePriceId?: string;
    price: string;
    label?: string;
    href?: string;
  };
}

const STRIPE_PRODUCTS = configuration.stripe.products;

const STRIPE_PLANS = STRIPE_PRODUCTS.reduce<string[]>((acc, product) => {
  product.plans.forEach((plan) => {
    if (plan.name && !acc.includes(plan.name)) {
      acc.push(plan.name);
    }
  });

  return acc;
}, []);

function PricingTable(
  props: React.PropsWithChildren<{
    CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
  }>,
) {
  const [planVariant, setPlanVariant] = useState<string>(STRIPE_PLANS[0]);

  return (
    <div className={'flex flex-col space-y-12'}>
      <div className={'flex justify-center'}>
        <PlansSwitcher
          plans={STRIPE_PLANS}
          plan={planVariant}
          setPlan={setPlanVariant}
        />
      </div>

      <div
        className={
          'flex flex-col items-start space-y-6 lg:space-y-0' +
          ' justify-center lg:flex-row lg:space-x-4'
        }
      >
        {STRIPE_PRODUCTS.map((product) => {
          const plan =
            product.plans.find((item) => item.name === planVariant) ??
            product.plans[0];

          return (
            <PricingItem
              selectable
              key={plan.stripePriceId ?? plan.name}
              plan={plan}
              product={product}
              CheckoutButton={props.CheckoutButton}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PricingTable;

PricingTable.Item = PricingItem;
PricingTable.Price = Price;
PricingTable.FeaturesList = FeaturesList;

function PricingItem(
  props: React.PropsWithChildren<
    PricingItemProps & {
      CheckoutButton?: React.ComponentType<CheckoutButtonProps>;
    }
  >,
) {
  const recommended = props.product.recommended ?? false;

  return (
    <div
      data-cy={'subscription-plan'}
      className={classNames(
        `
         relative flex w-full flex-col justify-between space-y-6 rounded-lg
         p-6 lg:w-4/12 xl:p-8 2xl:w-3/12 xl:max-w-xs
      `,
        {
          ['border-gray-100 dark:border-dark-900 border']: !recommended,
          ['border-primary border-2']: recommended,
        },
      )}
    >
      <div className={'flex flex-col space-y-2.5'}>
        <div className={'flex items-center space-x-6'}>
          <Heading type={3}>
            <b className={'font-semibold'}>{props.product.name}</b>
          </Heading>

          <If condition={props.product.badge}>
            <div
              className={classNames(
                `rounded-md py-1 px-2 text-xs font-medium flex space-x-1`,
                {
                  ['text-primary-foreground bg-primary']: recommended,
                  ['bg-gray-50 text-gray-500 dark:text-gray-800']: !recommended,
                },
              )}
            >
              <If condition={recommended}>
                <SparklesIcon className={'h-4 w-4 mr-1'} />
              </If>
              <span>{props.product.badge}</span>
            </div>
          </If>
        </div>

        <span className={'text-sm text-gray-500 dark:text-gray-400'}>
          {props.product.description}
        </span>
      </div>

      <div className={'flex items-end space-x-1'}>
        <Price>{props.plan.price}</Price>

        <If condition={props.plan.name}>
          <span
            className={classNames(
              `text-lg lowercase text-gray-500 dark:text-gray-400`,
            )}
          >
            <span>/</span>
            <span>{props.plan.name}</span>
          </span>
        </If>
      </div>

      <div className={'text-current'}>
        <FeaturesList features={props.product.features} />
      </div>

      <If condition={props.selectable}>
        <If
          condition={props.plan.stripePriceId && props.CheckoutButton}
          fallback={
            <DefaultCheckoutButton
              recommended={recommended}
              plan={props.plan}
            />
          }
        >
          {(CheckoutButton) => (
            <CheckoutButton
              recommended={recommended}
              stripePriceId={props.plan.stripePriceId}
            />
          )}
        </If>
      </If>
    </div>
  );
}

function FeaturesList(
  props: React.PropsWithChildren<{
    features: string[];
  }>,
) {
  return (
    <ul className={'flex flex-col space-y-2'}>
      {props.features.map((feature) => {
        return (
          <ListItem key={feature}>
            <Trans
              i18nKey={`common:plans.features.${feature}`}
              defaults={feature}
            />
          </ListItem>
        );
      })}
    </ul>
  );
}

function Price({ children }: React.PropsWithChildren) {
  // little trick to re-animate the price when switching plans
  const key = Math.random();

  return (
    <div
      key={key}
      className={`animate-in duration-500 slide-in-from-left-4 fade-in`}
    >
      <span className={'text-2xl font-bold lg:text-3xl xl:text-4xl'}>
        {children}
      </span>
    </div>
  );
}

function ListItem({ children }: React.PropsWithChildren) {
  return (
    <li className={'flex items-center space-x-3 font-medium'}>
      <div>
        <CheckCircleIcon className={'h-5'} />
      </div>

      <span className={'text-sm text-gray-600 dark:text-gray-300'}>
        {children}
      </span>
    </li>
  );
}

function PlansSwitcher(
  props: React.PropsWithChildren<{
    plans: string[];
    plan: string;
    setPlan: (plan: string) => void;
  }>,
) {
  return (
    <div className={'flex'}>
      {props.plans.map((plan, index) => {
        const selected = plan === props.plan;

        const className = classNames('focus:!ring-0 !outline-none', {
          'rounded-r-none border-r-transparent': index === 0,
          'rounded-l-none': index === props.plans.length - 1,
          ['hover:bg-gray-50 dark:hover:bg-background/80']: !selected,
          ['text-primary-800 dark:text-primary-500 font-semibold' +
          ' hover:bg-background hover:text-initial']: selected,
        });

        return (
          <Button
            key={plan}
            variant={'outline'}
            className={className}
            onClick={() => props.setPlan(plan)}
          >
            <span className={'flex space-x-1 items-center'}>
              <If condition={selected}>
                <CheckCircleIcon className={'h-4'} />
              </If>

              <span>
                <Trans i18nKey={`common:plans.${plan}`} defaults={plan} />
              </span>
            </span>
          </Button>
        );
      })}
    </div>
  );
}

function DefaultCheckoutButton(
  props: React.PropsWithChildren<{
    plan: PricingItemProps['plan'];
    recommended?: boolean;
  }>,
) {
  const linkHref =
    props.plan.href ??
    `${configuration.paths.signUp}?utm_source=${props.plan.stripePriceId}`;

  const label = props.plan.label ?? 'common:getStarted';

  return (
    <div className={'bottom-0 left-0 w-full p-0'}>
      <Button
        block
        href={linkHref}
        variant={props.recommended ? 'default' : 'outline'}
      >
        <Trans i18nKey={label} defaults={label} />
      </Button>
    </div>
  );
}
