import {
  getPageProps,
  getTranslation,
  usePage,
  useSettings,
  useGoogleAnalytics,
} from '@foundation/next';

import Page from '@foundation/components/Page';

export const getStaticProps = async context => {
  const t = await getTranslation(context.locale, 'common');

  return {
    props: await getPageProps(context, {
      page: {
        title: t(`languages.${context.locale}`),
      },
    }),
  };
};

export default function Home() {
  const { enabled: gaEnabled } = useGoogleAnalytics();
  const { settings } = useSettings();

  const { title, main } = usePage();

  function onClick() {
    settings.toggle('analytics', { on: true, off: null });
  }

  if (!main) return null; // check if beforePageHooks('main') works

  return (
    <Page>
      <div className="uk-container uk-margin-medium-top">
        <h1 className="uk-flex uk-flex-between uk-flex-middle uk-heading-medium uk-margin-large-bottom">
          <span>{title}</span>
          {gaEnabled && (
            <button
              className="uk-button uk-button-default"
              type="button"
              onClick={onClick}
            >
              Toggle Consent
            </button>
          )}
        </h1>
        <div className="uk-column-1-2@m space-y-4 uk-margin-bottom">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </p>
        </div>
        <div className="uk-column-1-2@m space-y-4 uk-margin-bottom">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore.
          </p>
        </div>
      </div>
    </Page>
  );
}
