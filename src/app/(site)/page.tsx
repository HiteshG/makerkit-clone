import Image from 'next/image';

import {
  BuildingLibraryIcon,
  CubeIcon,
  DocumentIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';
import PricingTable from '~/components/PricingTable';
import Trans from '~/core/ui/Trans';

export default function Home() {
  return (
    <div className={'flex flex-col space-y-16'}>
      <Container>
        <div
          className={
            'my-12 flex flex-col items-center md:flex-row lg:my-16' +
            ' mx-auto flex-1 justify-center animate-in fade-in ' +
            ' duration-1000 slide-in-from-top-12'
          }
        >
          <div className={'flex w-full flex-1 flex-col items-center space-y-8'}>
            <Pill>
              <span>
                <Trans i18nKey={'home:leadingSaasStarterKit'} />
              </span>
            </Pill>

            <HeroTitle>
              <span>
                <Trans i18nKey={'home:SassSolutionFor'} />
              </span>
              <span
                className={
                  'bg-gradient-to-br bg-clip-text text-transparent px-8' +
                  ' from-primary-400 to-primary-700 leading-[1.2]'
                }
              >
                <Trans i18nKey={'home:developersAndFounders'} />
              </span>
            </HeroTitle>

            <SubHeading className={'text-center'}>
              <span>
                <Trans i18nKey={'home:shortDescriptionForSaas'} />
              </span>
              <span>
                <Trans i18nKey={'home:multipleSubheading'} />
              </span>
              <span>
                <Trans i18nKey={'home:impressCustomer'} />
              </span>
            </SubHeading>

            <div className={'flex flex-col items-center space-y-4'}>
              <MainCallToActionButton />

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                <Trans i18nKey={'home:noCreditCardRequired'} />
              </span>
            </div>
          </div>
        </div>

        <div
          className={
            'flex justify-center py-6 max-w-7xl mx-auto animate-in fade-in ' +
            ' duration-3000 slide-in-from-top-16 fill-mode-both delay-300'
          }
        >
          <Image
            priority
            className={
              'shadow-[0_0_1000px_0] rounded-2xl' +
              ' shadow-primary/40 animate-in fade-in' +
              ' zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both'
            }
            width={3688}
            height={2824}
            src={`/assets/images/dashboard-dark.jpg`}
            alt={`App Image`}
          />
        </div>
      </Container>

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-16'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-8 text-center'
            }
          >
            <Pill>
              <Trans i18nKey={'home:modernStarterKit'} />
            </Pill>

            <div className={'flex flex-col space-y-2.5'}>
              <Heading type={2}>
                <Trans i18nKey={'home:bestTool'} />
              </Heading>

              <SubHeading as={'h3'}>
                <Trans i18nKey={'home:unbeatableFeatures'} />
              </SubHeading>
            </div>
          </div>

          <div>
            <div className={'grid gap-12 lg:grid-cols-3 sm:px-24'}>
              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <UserIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:authentication'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:authenticationDescription'} />
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <BuildingLibraryIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:multiTenancy'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:multiTenancyDescription'} />
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <UserGroupIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:teamManagement'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:teamManagementDescription'} />
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <PaintBrushIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:uiThemes'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:uiThemesDescription'} />
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <CubeIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:uiComponents'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:uiComponentsDescription'} />
                </div>
              </div>

              <div className={'flex flex-col space-y-2'}>
                <FeatureIcon>
                  <DocumentIcon className={'h-5'} />
                </FeatureIcon>

                <h4 className={'text-lg font-semibold'}>
                  <Trans i18nKey={'home:blogAndDocumentation'} />
                </h4>

                <div className={'text-gray-500 dark:text-gray-400 text-lg'}>
                  <Trans i18nKey={'home:blogAndDocumentationDescription'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className={'flex flex-col space-y-4'}>
          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={2}>
                  <Trans i18nKey={'home:authentication'} />
                </Heading>

                <SubHeading as={'h3'}>
                  <Trans i18nKey={'home:authenticationDescription'} />
                </SubHeading>
              </div>

              <div>
                <Trans i18nKey={'home:authenticationDetail'} />
              </div>

              <div>
                <Button round variant={'outline'} href={'/auth/sign-up'}>
                  <span className={'flex space-x-2 items-center'}>
                    <span>
                      <Trans i18nKey={'common:getStarted'} />
                    </span>
                    <ChevronRightIcon className={'h-3'} />
                  </span>
                </Button>
              </div>
            </LeftFeatureContainer>

            <RightFeatureContainer>
              <Image
                className="rounded-2xl shadow-[0_0_1000px_0] shadow-primary/40 animate-in fade-in zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
                src={'/assets/images/dashboard.webp'}
                width={'887'}
                height={'743'}
                alt={'Sign In'}
              />
            </RightFeatureContainer>
          </FeatureShowcaseContainer>

          <FeatureShowcaseContainer>
            <LeftFeatureContainer>
              <Image
                className="rounded-2xl shadow-[0_0_1000px_0] shadow-primary/40 animate-in fade-in zoom-in-50 delay-300 duration-1000 ease-out fill-mode-both"
                src={'/assets/images/dashboard.webp'}
                width={'887'}
                height={'743'}
                alt={'Dashboard'}
              />
            </LeftFeatureContainer>

            <RightFeatureContainer>
              <div className={'flex flex-col space-y-4'}>
                <Heading type={2}>
                  <Trans i18nKey={'home:dashboard'} />
                </Heading>

                <SubHeading>
                  <Trans i18nKey={'home:dashboardDescription'} />
                </SubHeading>

                <div>
                  <Trans i18nKey={'home:dashboardDetail'} />
                </div>

                <div>
                  <Button round variant={'outline'} href={'/auth/sign-up'}>
                    <span className={'flex space-x-2 items-center'}>
                      <span>
                        <Trans i18nKey={'common:getStarted'} />
                      </span>
                      <ChevronRightIcon className={'h-3'} />
                    </span>
                  </Button>
                </div>
              </div>
            </RightFeatureContainer>
          </FeatureShowcaseContainer>
        </div>
      </Container>

      <Divider />

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center py-16 space-y-16'
          }
        >
          <div className={'flex flex-col items-center space-y-8 text-center'}>
            <Pill>
              <Trans i18nKey={'home:cancelAnytime'} />
            </Pill>

            <div className={'flex flex-col space-y-2.5'}>
              <Heading type={2}>
                <Trans i18nKey={'home:readyToTakeSaasBusiness'} />
              </Heading>

              <SubHeading>
                <Trans i18nKey={'home:upgradeWhenYouAreReady'} />
              </SubHeading>
            </div>
          </div>

          <div className={'w-full'}>
            <PricingTable />
          </div>
        </div>
      </Container>
    </div>
  );
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center px-6 text-4xl text-gray-600 dark:text-white md:text-5xl' +
        ' flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex'}>
      <div
        className={
          'rounded-xl bg-primary/5 p-4 dark:bg-background border' +
          ' border-primary/5 dark:border-dark-800'
        }
      >
        {props.children}
      </div>
    </div>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}

function FeatureShowcaseContainer(props: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row items-center justify-between' +
        ' lg:space-x-24 sm:px-24'
      }
    >
      {props.children}
    </div>
  );
}

function LeftFeatureContainer(props: React.PropsWithChildren) {
  return (
    <div className={'flex flex-col space-y-8 w-full lg:w-6/12'}>
      {props.children}
    </div>
  );
}

function RightFeatureContainer(props: React.PropsWithChildren) {
  return <div className={'flex flex-col space-y-8 w-full lg:w-6/12'}>{props.children}</div>;
}

function MainCallToActionButton() {
  return (
    <Button
      className={
        'bg-transparent bg-gradient-to-r shadow-2xl' +
        ' hover:shadow-primary/60 from-primary' +
        ' to-primary-600 hover:to-indigo-600 text-white'
      }
      variant={'custom'}
      size={'lg'}
      round
      href={'/auth/sign-up'}
    >
      <span className={'flex items-center space-x-2'}>
        <span>
          <Trans i18nKey={'common:buildWchatGPT'} />
        </span>
        <ChevronRightIcon
          className={
            'h-4 animate-in fade-in slide-in-from-left-8' +
            ' delay-1000 fill-mode-both duration-1000 zoom-in'
          }
        />
      </span>
    </Button>
  );
}
