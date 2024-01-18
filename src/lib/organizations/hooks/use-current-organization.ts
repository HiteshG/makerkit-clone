import { useContext } from 'react';
import OrganizationContext from '~/lib/contexts/organization';

export default function useCurrentOrganization() {
  const { organization } = useContext(OrganizationContext);

  return organization;
}
