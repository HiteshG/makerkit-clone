import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import ProfileLayout from '@/components/settings/profile/ProfileLayout';
import Authentication from '@/components/settings/profile/Authentication';

const authentication = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <ProfileLayout>
        <Authentication />
      </ProfileLayout>
    </Layout>
  );
}

export default authentication;
