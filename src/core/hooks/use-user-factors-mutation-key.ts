import useUserId from '~/core/hooks/use-user-id';

function useFactorsMutationKey() {
  const userId = useUserId();

  return ['mfa-factors', userId];
}

export default useFactorsMutationKey;
