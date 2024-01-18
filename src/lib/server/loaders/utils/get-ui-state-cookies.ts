import { parseSidebarStateCookie } from '~/lib/server/cookies/sidebar-state.cookie';
import { parseThemeCookie } from '~/lib/server/cookies/theme.cookie';

function getUIStateCookies() {
  return {
    theme: parseThemeCookie(),
    sidebarState: parseSidebarStateCookie(),
  };
}

export default getUIStateCookies;
