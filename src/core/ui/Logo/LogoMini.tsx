import Link from 'next/link';
import LogoImageMini from '~/core/ui/Logo/LogoImageMini';

const LogoMini: React.FCC<{ href?: string }> = ({ href }) => {
  return (
    <Link href={href ?? '/'}>
      <LogoImageMini />
    </Link>
  );
};

export default LogoMini;
