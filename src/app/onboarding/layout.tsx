import LogoImage from '~/core/ui/Logo/LogoImage';

async function OnboardingLayout({ children }: React.PropsWithChildren) {
  return (
    <div className={'flex flex-1 flex-col dark:bg-background py-8 h-screen'}>
      <div className={'px-8 justify-between hidden lg:flex'}>
        <LogoImage />
      </div>

      <div
        className={
          'flex w-10/12 flex-1 flex-col items-center justify-center' +
          ' lg:w-8/12 mx-auto xl:max-w-2xl'
        }
      >
        <div
          className={
            'flex flex-col space-y-16 w-full lg:p-16' +
            ' lg:rounded-md zoom-in-95 animate-in fade-in ease-out' +
            ' duration-1000 slide-in-from-bottom-24'
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout;
