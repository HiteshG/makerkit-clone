import { useCallback, useContext, useState } from 'react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import classNames from 'clsx';

import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { SelectArrow } from '@radix-ui/react-select';

import type Organization from '~/lib/organizations/types/organization';
import useUserOrganizationsQuery from '~/lib/organizations/hooks/use-user-organizations-query';

import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectSeparator,
  SelectGroup,
  SelectAction,
  SelectLabel,
  SelectValue,
} from '~/core/ui/Select';

import If from '~/core/ui/If';
import Trans from '~/core/ui/Trans';
import { Avatar, AvatarFallback } from '~/core/ui/Avatar';

import UserSessionContext from '~/core/session/contexts/user-session';
import CreateOrganizationModal from './CreateOrganizationModal';
import type MembershipRole from '~/lib/organizations/types/membership-role';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import configuration from '~/configuration';

const OrganizationsSelector = ({ displayName = true }) => {
  const changeOrganization = useChangeOrganization();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const organization = useCurrentOrganization();
  const { userSession } = useContext(UserSessionContext);

  const userId = userSession?.data?.id as string;
  const selectedOrganizationId = organization?.uuid;

  const { data, isLoading } = useUserOrganizationsQuery(userId);

  return (
    <>
      <Select
        value={selectedOrganizationId}
        onValueChange={(uuid) => changeOrganization(uuid)}
      >
        <SelectTrigger asChild>
          <div
            role={'button'}
            className={classNames(
              `text-sm lg:text-base w-full group hover:bg-gray-50 cursor-pointer border-transparent dark:hover:bg-dark-900/50 dark:hover:text-white`,
              {
                ['justify-between max-h-12']: displayName,
                ['rounded-full border-none !p-0.5 mx-auto']: !displayName,
              },
            )}
            data-cy={'organization-selector'}
          >
            <OrganizationItem
              organization={organization}
              displayName={displayName}
            />

            <If condition={displayName}>
              <EllipsisVerticalIcon
                className={'h-5 hidden group-hover:block text-gray-500'}
              />
            </If>

            <span hidden>
              <SelectValue />
            </span>
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectArrow />

          <SelectGroup>
            <SelectLabel>
              <Trans i18nKey={'common:yourOrganizations'} />
            </SelectLabel>

            <SelectSeparator />

            <OrganizationsOptions organizations={data ?? []} />

            <If condition={isLoading}>
              <SelectItem value={selectedOrganizationId ?? ''}>
                <OrganizationItem organization={organization} />
              </SelectItem>
            </If>
          </SelectGroup>

          <SelectSeparator />

          <SelectGroup>
            <SelectAction
              data-cy={'create-organization-button'}
              className={'flex flex-row items-center space-x-2 truncate'}
              onClick={() => setIsModalOpen(true)}
            >
              <PlusCircleIcon className={'h-5'} />

              <span>
                <Trans
                  i18nKey={'organization:createOrganizationDropdownLabel'}
                />
              </span>
            </SelectAction>
          </SelectGroup>
        </SelectContent>
      </Select>

      <CreateOrganizationModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
};

function OrganizationsOptions(
  props: React.PropsWithChildren<{
    organizations: Array<{
      organization: Organization;
      role: MembershipRole;
    }>;
  }>,
) {
  return (
    <>
      {props.organizations.map(({ organization }) => {
        return (
          <SelectItem
            data-cy={`organization-selector-${organization.name}`}
            value={organization.uuid}
            key={organization.uuid}
          >
            <OrganizationItem displayName organization={organization} />
          </SelectItem>
        );
      })}
    </>
  );
}

function OrganizationItem({
  organization,
  displayName = true,
}: {
  organization: Maybe<Organization>;
  displayName?: boolean;
}) {
  const imageSize = 20;

  if (!organization) {
    return null;
  }

  const { logoURL, name } = organization;

  return (
    <div
      data-cy={'organization-selector-item'}
      className={classNames(`flex max-w-[12rem] items-center space-x-2.5`, {
        'w-full': !displayName,
      })}
    >
      <If
        condition={logoURL}
        fallback={
          <FallbackOrganizationLogo
            className={displayName ? '' : 'mx-auto'}
            name={organization.name}
          />
        }
      >
        <Image
          width={imageSize}
          height={imageSize}
          alt={`${name} Logo`}
          className={'object-contain w-6 h-6 mx-auto'}
          src={logoURL as string}
        />
      </If>

      <If condition={displayName}>
        <span className={'w-auto truncate text-sm'}>{name}</span>
      </If>
    </div>
  );
}

export default OrganizationsSelector;

function useChangeOrganization() {
  const path = usePathname();
  const params = useParams();
  const router = useRouter();

  return useCallback(
    (uuid: string) => {
      const appPrefix = configuration.paths.appPrefix;
      const organizationPath = `${appPrefix}/${uuid}`;
      const route = path?.replace(`${appPrefix}/${params?.organization}`, '');

      if (route !== undefined) {
        router.push(`${organizationPath}/${route}`);
      }
    },
    [params?.organization, path, router],
  );
}

function FallbackOrganizationLogo(
  props: React.PropsWithChildren<{
    name: string;
    className?: string;
  }>,
) {
  const initials = (props.name ?? '')
    .split(' ')
    .reduce((acc, word) => {
      return acc + word[0];
    }, '')
    .slice(0, 1);

  return (
    <Avatar className={classNames('!w-6 !h-6', props.className)}>
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
