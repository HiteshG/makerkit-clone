import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import OrganizationLayout from '@/components/settings/organization/OrganizationLayout';
import Members from '@/components/settings/organization/Members';

const index = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <OrganizationLayout>
        <Members />
      </OrganizationLayout>
    </Layout>
  );
}

export default index;
