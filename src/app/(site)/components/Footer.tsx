import Link from 'next/link';

import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import configuration from '~/configuration';
import NewsletterSignup from './NewsletterSignup';
import Trans from '~/core/ui/Trans';

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className={'py-8 lg:py-24'}>
      <Container>
        <div className={'flex flex-col space-y-8 lg:flex-row lg:space-y-0'}>
          <div
            className={
              'flex w-full space-x-2 lg:w-4/12 xl:w-3/12' +
              ' xl:space-x-6 2xl:space-x-8'
            }
          >
            <div className={'flex flex-col space-y-4'}>
              <div>
                <LogoImage className={'w-[85px] md:w-[115px]'} />
              </div>

              <div>
                <p className={'text-sm text-gray-500 dark:text-gray-400'}>
                  <Trans i18nKey={'common:projectTagLine'} />
                </p>
              </div>

              <div className={'flex text-xs text-gray-500 dark:text-gray-400'}>
                <p>
                  © Copyright {YEAR} {configuration.site.siteName}.
                  &nbsp;<Trans i18nKey={'common:allRightReserved'} />
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              'flex flex-col space-y-8 lg:space-y-0 lg:space-x-6' +
              ' xl:space-x-16 2xl:space-x-20' +
              ' w-full lg:flex-row lg:justify-end'
            }
          >
            <div>
              <div className={'flex flex-col space-y-4'}>
                <FooterSectionHeading>
                  <Trans i18nKey={'common:about'} />
                </FooterSectionHeading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:whoWeAre'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/blog'}>
                      <Trans i18nKey={'common:blog'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'/contact'}>
                      <Trans i18nKey={'common:contactUs'} />
                    </Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <FooterSectionHeading>
                  <Trans i18nKey={'common:product'} />
                </FooterSectionHeading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'/docs'}>
                      <Trans i18nKey={'common:documentation'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:helpCenter'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:changeLog'} />
                    </Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={'flex flex-col space-y-4'}>
                <FooterSectionHeading>
                  <Trans i18nKey={'common:legal'} />
                </FooterSectionHeading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:termsOfService'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:privacyPolicy'} />
                    </Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={'#'}>
                      <Trans i18nKey={'common:cookiePolicy'} />
                    </Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSectionHeading(props: React.PropsWithChildren) {
  return (
    <p>
      <span className={'font-semibold'}>{props.children}</span>
    </p>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul className={'flex flex-col space-y-4 text-gray-500 dark:text-gray-400'}>
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800' +
        ' dark:[&>a]:hover:text-white'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
