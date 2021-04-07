import { useTranslation, useCurrency } from 'state';

import LocaleList from 'components/LocaleList';
import CurrencyList from 'components/CurrencyList';

export default function About() {
  const { t, lang } = useTranslation('common');
  const c = useCurrency();

  return (
    <div className="uk-container uk-margin-top">
      <h1 className="uk-flex uk-flex-between uk-flex-middle uk-heading-medium uk-margin-large-bottom">
        <span>{t('pages.about')}</span>
        <span className="uk-text-muted uk-text-light">{c.format(16.45)}</span>
      </h1>
      <div className="uk-column-1-2@m space-y-4 uk-margin-bottom">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
      </div>
      <div className="uk-grid uk-child-width-1-2@m space-y-4 md:space-y-0">
        <div>
          <h3 className="uk-text-medium uk-text-bold uk-margin-bottom">{t('language')} <span className="uk-text-light">{t(`languages.${lang}`)}</span></h3>
          <LocaleList />
        </div>
        <div>
          <h3 className="uk-text-medium uk-text-bold uk-margin-bottom">{t('currency')} <span className="uk-text-light">{c.name}</span></h3>
          <CurrencyList />
        </div>
      </div>
    </div>
  );
}