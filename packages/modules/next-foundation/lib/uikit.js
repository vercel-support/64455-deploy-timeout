/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { Link } from './navigation';
import { usePage, usePageOptions } from './page';
import { get } from './util';

// Setup Link classes to use UIkit
Link.defaults.activeClassName = Link.defaults.activeClassName ?? 'uk-active';
Link.defaults.matchClassName =
  Link.defaults.matchClassName ?? 'uk-active-match';

// NOTE you can import the utils directly as follows - but it will add to the bundle size:
//
// import { util } from '@atelierfabien/uikit';

export function useUIkit(fn) {
  const [ready, setReady] = useState(false);

  const ref = useRef();
  ref.current = fn;

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser && !window.UIkit) {
      async function load() {
        const UIkit = await import('@atelierfabien/uikit').then(
          (m) => m.default
        );

        const icons = await import(
          '@atelierfabien/uikit/dist/js/uikit-icons.min'
        ).then((m) => m.default);

        window.UIkit = UIkit;
        UIkit.use(icons);
        setReady(true);
        if (typeof ref.current === 'function') ref.current(window.UIkit);
      }

      load();
    } else if (isBrowser && window.UIkit) {
      setReady(true);
      if (typeof ref.current === 'function') ref.current(window.UIkit);
    }
  }, [ref]);

  return ready;
}

export function UIkit({ fadeIn, children, ...props }) {
  const page = usePage();
  const pageOptions = usePageOptions();
  const ready = useUIkit();
  const className = ready ? (fadeIn ? 'uk-animation-fade' : null) : 'uk-hidden';
  const pageLayout = get(pageOptions, ['pageLayout', 'layout']);
  const layout =
    typeof pageLayout === 'string'
      ? pageLayout
      : get(page, ['layout', 'identifier']);
  return (
    <div className={className} {...props} data-page-layout={layout}>
      {children}
    </div>
  );
}
