import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import ProfileLayout from '@/components/settings/profile/ProfileLayout';
import Password from '@/components/settings/profile/Password';

const password = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <ProfileLayout>
        <Password />
      </ProfileLayout>
    </Layout>
  );
}

export default password;
