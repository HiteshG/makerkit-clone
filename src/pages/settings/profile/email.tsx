import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import ProfileLayout from '@/components/settings/profile/ProfileLayout';
import Email from '@/components/settings/profile/Email';

const email = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <ProfileLayout>
        <Email />
      </ProfileLayout>
    </Layout>
  );
}

export default email;
