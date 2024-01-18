import Spinner from '~/core/ui/Spinner';

const LoadingMembersSpinner: React.FCC = ({ children }) => {
  return (
    <div className={'flex flex-row items-center space-x-4'}>
      <Spinner />

      <span className={'text-sm'}>{children}</span>
    </div>
  );
};

export default LoadingMembersSpinner;
