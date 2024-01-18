import AuthPageShell from '~/app/auth/components/AuthPageShell';

async function InvitePageLayout({ children }: React.PropsWithChildren) {
  return <AuthPageShell>{children}</AuthPageShell>;
}

export default InvitePageLayout;
