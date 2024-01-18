import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import FaqItem from '~/app/(site)/components/FaqItem';

export const metadata = {
  title: 'FAQ',
};

const DATA = [
  {
    question: `Do you offer a free trial?`,
    answer: `Yes, we offer a 14-day free trial. You can cancel at any time during the trial period and you won't be charged.`,
  },
  {
    question: `Can I cancel my subscription?`,
    answer: `You can cancel your subscription at any time. You can do this from your account settings.`,
  },
  {
    question: `Where can I find my invoices?`,
    answer: `You can find your invoices in your account settings.`,
  },
  {
    question: `What payment methods do you accept?`,
    answer: `We accept all major credit cards and PayPal.`,
  },
  {
    question: `Can I upgrade or downgrade my plan?`,
    answer: `Yes, you can upgrade or downgrade your plan at any time. You can do this from your account settings.`,
  },
  {
    question: `Do you offer discounts for non-profits?`,
    answer: `Yes, we offer a 50% discount for non-profits. Please contact us to learn more.`,
  },
];

const FAQPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: DATA.map((item) => {
      return {
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      };
    }),
  };

  return (
    <div>
      <script
        key={'ld:json'}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Container>
        <div className={'flex flex-col space-y-8 my-8'}>
          <div className={'flex flex-col items-center space-y-4'}>
            <Heading type={1}>FAQ</Heading>

            <SubHeading>Frequently Asked Questions</SubHeading>
          </div>

          <div
            className={
              'm-auto flex w-full max-w-xl items-center justify-center'
            }
          >
            <div className="flex w-full flex-col">
              {DATA.map((item, index) => {
                return <FaqItem key={index} item={item} />;
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FAQPage;
