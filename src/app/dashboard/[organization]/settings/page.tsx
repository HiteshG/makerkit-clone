import { redirect } from 'next/navigation';

function SettingsPage() {
  return redirect(`settings/profile`);
}

export default SettingsPage;
