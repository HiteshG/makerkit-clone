import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import OrganizationLayout from '@/components/settings/organization/OrganizationLayout';
import Invite from '@/components/settings/organization/Invite';

const invite = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <OrganizationLayout>
        <Invite />
      </OrganizationLayout>
    </Layout>
  );
}

export default invite;
