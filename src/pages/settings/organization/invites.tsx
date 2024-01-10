import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import OrganizationLayout from '@/components/settings/organization/OrganizationLayout';
import PendingInvites from '@/components/settings/organization/PendingInvites';

const invites = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <OrganizationLayout>
        <PendingInvites />
      </OrganizationLayout>
    </Layout>
  );
}

export default invites;
