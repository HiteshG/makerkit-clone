import Trans from '~/core/ui/Trans';
import ConvertkitSignupForm from '~/components/newsletter/ConvertkitSignupForm';
import configuration from '~/configuration';

function NewsletterSignup() {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <span className={'font-semibold'}>
          <Trans i18nKey={'common:subscribeOurNewsletter'} />
        </span>

        <div className={'text-sm text-gray-500 dark:text-gray-400'}>
          <Trans i18nKey={'common:getUpdatesFromTeam'} />
        </div>
      </div>

      <div>
        <ConvertkitSignupForm formId={configuration.site.convertKitFormId}>
          <Trans i18nKey={'common:subscribe'} />
        </ConvertkitSignupForm>
      </div>
    </div>
  );
}

export default NewsletterSignup;
