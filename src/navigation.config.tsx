import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';

import configuration from '~/configuration';

type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const paths = configuration.paths;

const NAVIGATION_CONFIG = (organization: string): NavigationConfig => ({
  items: [
    {
      label: 'Dashboard',
      path: getPath(organization, ''),
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      end: true,
    },
    {
      label: 'Tasks',
      path: getPath(organization, 'tasks'),
      Icon: ({ className }: { className: string }) => {
        return <CircleStackIcon className={className} />;
      },
      end: true,
    },
    {
      label: 'Settings',
      collapsible: false,
      children: [
        {
          label: 'Profile',
          path: getPath(organization, paths.settings.profile),
          Icon: ({ className }: { className: string }) => {
            return <UserIcon className={className} />;
          },
        },
        {
          label: 'Organization',
          path: getPath(organization, paths.settings.organization),
          Icon: ({ className }: { className: string }) => {
            return <UserGroupIcon className={className} />;
          },
        },
        {
          label: 'Subscription',
          path: getPath(organization, paths.settings.subscription),
          Icon: ({ className }: { className: string }) => {
            return <CreditCardIcon className={className} />;
          },
        },
      ],
    },
  ],
});

export default NAVIGATION_CONFIG;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return [appPrefix, organizationId, path].filter(Boolean).join('/');
}
