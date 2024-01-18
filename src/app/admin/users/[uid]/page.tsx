import Link from 'next/link';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import AdminHeader from '~/app/admin/components/AdminHeader';
import AdminGuard from '~/app/admin/components/AdminGuard';
import { TextFieldInput, TextFieldLabel } from '~/core/ui/TextField';
import Heading from '~/core/ui/Heading';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/core/ui/Table';

import Tile from '~/core/ui/Tile';
import Badge from '~/core/ui/Badge';
import Label from '~/core/ui/Label';
import { PageBody } from '~/core/ui/Page';

import RoleBadge from '~/app/dashboard/[organization]/settings/organization/components/RoleBadge';
import UserActionsDropdown from '~/app/admin/users/[uid]/components/UserActionsDropdown';

import configuration from '~/configuration';
import MembershipRole from '~/lib/organizations/types/membership-role';

interface Params {
  params: {
    uid: string;
  };
}

export const metadata = {
  title: `Manage User | ${configuration.site.siteName}`,
};

async function AdminUserPage({ params }: Params) {
  const uid = params.uid;

  const data = await loadData(uid);
  const { auth, user } = data;
  const displayName = user?.displayName;
  const authUser = auth?.user;
  const email = authUser?.email;
  const phone = authUser?.phone;
  const organizations = data.organizations ?? [];

  const isBanned = Boolean(
    authUser && 'banned_until' in authUser && authUser.banned_until !== 'none',
  );

  return (
    <div className={'flex flex-col flex-1'}>
      <AdminHeader>Manage User</AdminHeader>

      <PageBody>
        <div className={'flex flex-col space-y-6'}>
          <div className={'flex justify-between'}>
            <Breadcrumbs displayName={displayName ?? email ?? ''} />

            <div>
              <UserActionsDropdown uid={uid} isBanned={isBanned} />
            </div>
          </div>

          <Tile>
            <Heading type={4}>User Details</Heading>

            <div className={'flex space-x-2 items-center'}>
              <div>
                <Label>Status</Label>
              </div>

              <div className={'inline-flex'}>
                {isBanned ? (
                  <Badge size={'small'} color={'error'}>
                    Banned
                  </Badge>
                ) : (
                  <Badge size={'small'} color={'success'}>
                    Active
                  </Badge>
                )}
              </div>
            </div>

            <TextFieldLabel>
              Display name
              <TextFieldInput
                className={'max-w-sm'}
                defaultValue={displayName ?? ''}
                disabled
              />
            </TextFieldLabel>

            <TextFieldLabel>
              Email
              <TextFieldInput
                className={'max-w-sm'}
                defaultValue={email ?? ''}
                disabled
              />
            </TextFieldLabel>

            <TextFieldLabel>
              Phone number
              <TextFieldInput
                className={'max-w-sm'}
                defaultValue={phone ?? ''}
                disabled
              />
            </TextFieldLabel>
          </Tile>

          <Tile>
            <Heading type={4}>Organizations</Heading>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization ID</TableHead>
                  <TableHead>UUID</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {organizations.map((membership) => {
                  const organization = membership.organization;
                  const href = `/admin/organizations/${organization.uuid}/members`;

                  return (
                    <TableRow key={membership.id}>
                      <TableCell>{organization.id}</TableCell>
                      <TableCell>{organization.uuid}</TableCell>

                      <TableCell>
                        <Link className={'hover:underline'} href={href}>
                          {organization.name}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <div className={'inline-flex'}>
                          <RoleBadge role={membership.role} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Tile>
        </div>
      </PageBody>
    </div>
  );
}

export default AdminGuard(AdminUserPage);

async function loadData(uid: string) {
  const client = getSupabaseServerComponentClient({ admin: true });
  const authUser = client.auth.admin.getUserById(uid);

  const userData = client
    .from('users')
    .select(
      `
      id,
      displayName: display_name,
      photoURL: photo_url,
      onboarded
  `,
    )
    .eq('id', uid)
    .single();

  const organizationsQuery = client
    .from('memberships')
    .select<
      string,
      {
        id: number;
        role: MembershipRole;
        organization: {
          id: number;
          uuid: string;
          name: string;
        };
      }
    >(
      `
        id,
        role,
        organization: organization_id !inner (
          id, 
          uuid,
          name
        )
    `,
    )
    .eq('user_id', uid);

  const [auth, user, organizations] = await Promise.all([
    authUser,
    userData,
    organizationsQuery,
  ]);

  return {
    auth: auth.data,
    user: user.data,
    organizations: organizations.data,
  };
}

function Breadcrumbs(
  props: React.PropsWithChildren<{
    displayName: string;
  }>,
) {
  return (
    <div className={'flex space-x-1 items-center text-xs p-2'}>
      <Link href={'/admin'}>Admin</Link>
      <ChevronRightIcon className={'w-3'} />
      <Link href={'/admin/users'}>Users</Link>
      <ChevronRightIcon className={'w-3'} />
      <span>{props.displayName}</span>
    </div>
  );
}
