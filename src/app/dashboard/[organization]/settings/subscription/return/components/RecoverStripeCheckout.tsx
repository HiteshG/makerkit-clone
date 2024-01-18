import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const EmbeddedStripeCheckout = dynamic(
  () => {
    return import('../../components/EmbeddedStripeCheckout');
  },
  {
    ssr: false,
  },
);

function RecoverStripeCheckout({ clientSecret }: { clientSecret: string }) {
  const router = useRouter();

  return (
    <EmbeddedStripeCheckout
      clientSecret={clientSecret}
      onClose={() => {
        return router.replace('/settings/subscription');
      }}
    />
  );
}

export default RecoverStripeCheckout;
