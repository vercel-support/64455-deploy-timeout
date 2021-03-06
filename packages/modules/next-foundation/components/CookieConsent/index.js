import { useCallback, useRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';
import site from '@app/config/site';
import { useGoogleAnalytics, Link } from '../../lib';
import { pick } from '../../lib/util';

const defaults = pick(site, 'cookiePolicy', 'privacyPolicy');

export default function CookieConsent(props) {
  const { cookiePolicy, privacyPolicy } = {
    ...defaults,
    ...props,
  };

  const { prompt, accept, reject } = useGoogleAnalytics({
    initialize: true,
    ...props,
  });

  const { t } = useTranslation();
  const ref = useRef();

  const cookiePolicyHref =
    cookiePolicy ?? t('common:cookieConsent.cookiePolicyHref');

  const privacyPolicyHref =
    privacyPolicy ?? t('common:cookieConsent.privacyPolicyHref');

  const onClose = useCallback(
    consent => {
      const { Transition, removeClass } = UIkit.util;
      if (ref.current) {
        removeClass(ref.current, 'uk-animation-slide-bottom');
        Transition.start(ref.current, { opacity: 0 }, 300).then(() =>
          consent()
        );
      } else {
        consent();
      }
    },
    [ref]
  );

  return (
    prompt && (
      <div
        ref={ref}
        className="group fixed items-center z-[9999] md:w-[480px] left-4 md:left-auto bottom-4 right-4 p-4 uk-card uk-card-default uk-animation-slide-bottom uk-text-small"
      >
        <button
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
          type="button"
          onClick={() => onClose(reject)}
          uk-close=""
        />
        <p className="mt-0 mr-4 mb-4">
          <Trans
            i18nKey={
              privacyPolicyHref === cookiePolicyHref
                ? 'common:cookieConsent.basic'
                : 'common:cookieConsent.text'
            }
            components={[
              <Link
                key="cookie"
                href={cookiePolicyHref}
                className="uk-text-bold"
              />,
              <Link
                key="privacy"
                href={privacyPolicyHref}
                className="uk-text-bold"
              />,
            ]}
          />
        </p>
        <button
          className="w-full md:w-auto uk-button uk-button-primary uk-button-small"
          type="button"
          onClick={() => onClose(accept)}
        >
          {t('common:cookieConsent.accept')}
        </button>
      </div>
    )
  );
}
