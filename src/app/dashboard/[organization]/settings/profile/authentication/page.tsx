import MultiFactorAuthenticationSettings from './components/MultiFactorAuthenticationSettings';
import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Authentication',
};

function AuthenticationPage() {
  return <MultiFactorAuthenticationSettings />;
}

export default withI18n(AuthenticationPage);
