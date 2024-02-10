import Image from 'next/image';
import { forwardRef } from 'react';

import classNames from 'clsx';

import LazyRender from '~/core/ui/LazyRender';
import ClientOnly from '~/core/ui/ClientOnly';

import configuration from '~/configuration';

const NextImage: React.FCC<
  StringObject & {
    width: number;
    height: number;
  }
> = (props) => {
  const className = classNames(props.class, `object-cover`);

  return (
    <Image className={className} src={props.src} alt={props.alt} {...props} />
  );
};

const ExternalLink = forwardRef<
  React.ElementRef<'a'>,
  React.AnchorHTMLAttributes<unknown>
>(function ExternalLink(props, ref) {
  const siteUrl = configuration.site.siteUrl ?? '';
  const href = props.href ?? '';
  const isRoot = href[0] === '/';
  const isInternalLink = href.startsWith(siteUrl) || isRoot;

  if (isInternalLink) {
    return (
      <a {...props} ref={ref} href={href}>
        {props.children}
      </a>
    );
  }

  return (
    <a
      href={href}
      ref={ref}
      {...props}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
});

const Video: React.FCC<{
  src: string;
  width?: string;
  type?: string;
}> = ({ src, type, width }) => {
  const useType = type ?? 'video/mp4';

  return (
    <ClientOnly>
      <LazyRender rootMargin={'-200px 0px'}>
        <video
          className="my-4"
          width={width ?? `100%`}
          height="auto"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src={src} type={useType} />
        </video>
      </LazyRender>
    </ClientOnly>
  );
};

const Components = {
  img: NextImage,
  a: ExternalLink,
  Video,
  Image: NextImage,
};

export default Components;
