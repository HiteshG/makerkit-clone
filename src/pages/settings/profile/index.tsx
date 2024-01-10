import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import ProfileLayout from '@/components/settings/profile/ProfileLayout';
import MyDetails from '@/components/settings/profile/MyDetails';

const index = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
      <ProfileLayout>
        <MyDetails />
      </ProfileLayout>
    </Layout>
  );
}

export default index;
