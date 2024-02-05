import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import FaqItem from '~/app/(site)/components/FaqItem';
import Trans from '~/core/ui/Trans';

export const metadata = {
  title: 'FAQ',
};

const DATA = [
  {
    question: 'faq:question1',
    answer: 'faq:answer1',
  },
  {
    question: 'faq:question2',
    answer: 'faq:answer2',
  },
  {
    question: 'faq:question3',
    answer: 'faq:answer3',
  },
  {
    question: 'faq:question4',
    answer: 'faq:answer4',
  },
  {
    question: 'faq:question5',
    answer: 'faq:answer5',
  },
  {
    question: 'faq:question6',
    answer: 'faq:answer6',
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
            <Heading type={1}>
              {/* <Trans i18nKey={'common:faq'} /> */}
            </Heading>

            <SubHeading>
              {/* <Trans i18nKey={'faq:faqDescription'} /> */}
            </SubHeading>
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
