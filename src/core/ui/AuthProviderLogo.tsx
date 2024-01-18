import Image from 'next/image';

import {
  AtSymbolIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';

const DEFAULT_IMAGE_SIZE = 22;

const AuthProviderLogo: React.FC<{
  providerId: string;
  width?: number;
  height?: number;
}> = ({ providerId, width, height }) => {
  const image = getOAuthProviderLogos()[providerId];

  if (typeof image === `string`) {
    return (
      <Image
        decoding={'async'}
        loading={'lazy'}
        src={image}
        alt={`${providerId} logo`}
        width={width ?? DEFAULT_IMAGE_SIZE}
        height={height ?? DEFAULT_IMAGE_SIZE}
      />
    );
  }

  return <>{image}</>;
};

function getOAuthProviderLogos(): Record<string, string | React.ReactNode> {
  return {
    password: <AtSymbolIcon className={'h-[22px] w-[22px]'} />,
    phone: <DevicePhoneMobileIcon className={'h-[22px] w-[22px]'} />,
    google: '/assets/images/google.webp',
    facebook: '/assets/images/facebook.webp',
    twitter: '/assets/images/twitter.webp',
    github: '/assets/images/github.webp',
    microsoft: '/assets/images/microsoft.webp',
    apple: '/assets/images/apple.webp',
  };
}

export default AuthProviderLogo;
