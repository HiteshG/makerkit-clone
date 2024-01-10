import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import OrganizationLayout from '@/components/settings/organization/OrganizationLayout';
import General from '@/components/settings/organization/General';

const index = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <OrganizationLayout>
        <General />
      </OrganizationLayout>
    </Layout>
  );
}

export default index;
