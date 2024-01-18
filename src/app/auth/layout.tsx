import AuthPageShell from '~/app/auth/components/AuthPageShell';

async function AuthLayout({ children }: React.PropsWithChildren) {
  return <AuthPageShell>{children}</AuthPageShell>;
}

export default AuthLayout;
