'use client';

import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '~/core/ui/Select';

import useRefresh from '~/core/hooks/use-refresh';

const LanguageDropdownSwitcher: React.FC<{
  onChange?: (locale: string) => unknown;
}> = ({ onChange }) => {
  const { i18n } = useTranslation();
  const refresh = useRefresh();

  const { language: currentLanguage, options } = i18n;

  const locales = (options.supportedLngs as string[]).filter(
    (locale) => locale.toLowerCase() !== 'cimode',
  );

  const languageNames = useMemo(() => {
    return new Intl.DisplayNames([currentLanguage], {
      type: 'language',
    });
  }, [currentLanguage]);

  const [value, setValue] = useState(i18n.language);

  const languageChanged = useCallback(
    async (locale: string) => {
      setValue(locale);

      if (onChange) {
        onChange(locale);
      }

      await i18n.changeLanguage(locale);
      await refresh();
    },
    [i18n, onChange, refresh],
  );

  return (
    <Select value={value} onValueChange={languageChanged}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {locales.map((locale) => {
          const label = capitalize(languageNames.of(locale) ?? locale);

          const option = {
            value: locale,
            label,
          };

          return (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

function capitalize(lang: string) {
  return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LanguageDropdownSwitcher;
