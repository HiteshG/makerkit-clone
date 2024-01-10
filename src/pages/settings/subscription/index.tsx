import React from 'react';
import Layout from '@/core/layout';
import SettingBar from '@/components/settings/SettingBar';
import Subscription from "@/components/settings/subscription";

const index = () => {
  return (
    <Layout title={"Settings"} description="Manage your settings and preferences.">
      <SettingBar />
			<Subscription />
    </Layout>
  );
}

export default index;
