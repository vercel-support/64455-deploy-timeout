import { usePropsOrPage, usePageFragments } from '@foundation/next';

import { camelCase } from '@foundation/lib/util';

export const usePageWithLayout = props => {
  const { page, inheritFragments = 'layout' } = props;
  const { layout, ...pageProps } = usePropsOrPage(page);
  const fragments = usePageFragments(page, inheritFragments);

  return {
    ...pageProps,
    layout,
    fragments,
    options: layout?.options ?? {},
  };
};

export const withPageWithLayout = (type, Component, options = {}) => {
  const { expandViewport = true } = options;

  const fn = function PageWithLayout(props) {
    const page = usePageWithLayout(props);
    const containerProps = page.options.containerProps ?? {};

    return (
      <section
        data-part="layout"
        data-page-type={type}
        {...containerProps}
        uk-height-viewport={expandViewport ? 'expand: true' : null}
      >
        <Component {...props} page={page} />
      </section>
    );
  };

  fn.displayName = `${camelCase(type)}PageType`;

  return fn;
};
