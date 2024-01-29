import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import MobileNavigationDropdown from '~/core/ui/MobileNavigationDropdown';
import configuration from '~/configuration';

const getLinks = (organizationId: string) => ({
  General: {
    path: getPath(organizationId, 'organization'),
    label: 'organization:generalTabLabel',
  },
  Members: {
    path: getPath(organizationId, 'organization/members'),
    label: 'organization:membersTabLabel',
  },
});

const OrganizationSettingsTabs: React.FC<{
  organizationId: string;
}> = ({ organizationId }) => {
  const itemClassName = `flex justify-center lg:justify-start items-center w-full`;
  const links = getLinks(organizationId);

  return (
    <>
      <div className={'hidden h-full min-w-[12rem] lg:flex'}>
        <NavigationMenu vertical pill>
          <NavigationItem
            depth={0}
            className={itemClassName}
            link={links.General}
          />

          <NavigationItem className={itemClassName} link={links.Members} />
        </NavigationMenu>
      </div>

      <div className={'block w-full lg:hidden'}>
        <MobileNavigationDropdown links={Object.values(links)} />
      </div>
    </>
  );
};

export default OrganizationSettingsTabs;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return `${appPrefix}/${organizationId}/settings/${path}`;
}
