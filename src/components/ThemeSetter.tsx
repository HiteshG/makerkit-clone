'use client';

import { useEffect } from 'react';
import isBrowser from '~/core/generic/is-browser';
import { loadSelectedTheme } from '~/core/theming';
import configuration from '~/configuration';

const enableThemeSwitcher = configuration.features.enableThemeSwitcher;

function ThemeSetter() {
  useEffect(() => {
    if (isBrowser() && enableThemeSwitcher) {
      loadSelectedTheme();
    }
  }, []);

  return null;
}

export default ThemeSetter;
