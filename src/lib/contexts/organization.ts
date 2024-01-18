import { createContext } from 'react';
import type { UserOrganizationData } from '~/lib/organizations/database/queries';

type OrganizationContextPayload = UserOrganizationData['organization'];

const OrganizationContext = createContext<{
  organization: Maybe<OrganizationContextPayload>;
  setOrganization: (organization: Maybe<OrganizationContextPayload>) => void;
}>({
  organization: undefined,
  setOrganization: (_) => _,
});

export default OrganizationContext;
