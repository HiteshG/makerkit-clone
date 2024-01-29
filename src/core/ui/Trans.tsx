import { Trans as TransComponent } from 'react-i18next/TransWithoutContext';

function Trans(props: React.ComponentProps<typeof TransComponent>) {
  return <TransComponent {...props} />;
}

export default Trans;
