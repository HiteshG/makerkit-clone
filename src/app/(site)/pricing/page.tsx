import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import PricingTable from '~/components/PricingTable';
import Trans from '~/core/ui/Trans';

export const metadata = {
  title: 'Pricing',
};

function PricingPage() {
  return (
    <Container>
      <div className={'flex flex-col space-y-16 my-8'}>
        <div className={'flex flex-col items-center space-y-4'}>
          <Heading type={1}>
            <Trans i18nKey={'common:pricing'} />
          </Heading>
          <SubHeading>
            <Trans i18nKey={'pricing:pricingDescription'} />
          </SubHeading>
        </div>

        <PricingTable />
      </div>
    </Container>
  );
}

export default PricingPage;
