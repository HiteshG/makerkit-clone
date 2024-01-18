import Plans from './components/Plans';
import PlansStatusAlertContainer from './components/PlanStatusAlertContainer';
import Heading from '~/core/ui/Heading';

export const metadata = {
  title: 'Subscription',
};

const SubscriptionSettingsPage = () => {
  return (
    <div className={'flex flex-col space-y-4 w-full'}>
      <div className={'flex flex-col px-2 space-y-1'}>
        <Heading type={4}>
          Subscription
        </Heading>

        <span className={'text-gray-500 dark:text-gray-400'}>
          Manage your Subscription and Billing
        </span>
      </div>

      <PlansStatusAlertContainer />

      <Plans />
    </div>
  );
};

export default SubscriptionSettingsPage;
