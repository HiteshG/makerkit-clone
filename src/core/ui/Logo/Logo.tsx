import Link from 'next/link';
import LogoImage from './LogoImage';

const Logo: React.FCC<{
  href?: string;
  className?: string;
  label?: string;
}> = ({ href, label, className }) => {
  return (
    <Link aria-label={label ?? 'Home Page'} href={href ?? '/'}>
      <LogoImage className={className} />
    </Link>
  );
};

export default Logo;
