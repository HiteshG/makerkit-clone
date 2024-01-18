import Footer from '~/app/(site)/components/Footer';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';

async function SiteLayout(props: React.PropsWithChildren) {
  const { session } = await loadUserData();

  return (
    <>
      <SiteHeaderSessionProvider data={session} />

      {props.children}

      <Footer />
    </>
  );
}

export default SiteLayout;
