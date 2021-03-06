import { joinUrl } from '@foundation/lib/util';
import { useRouter, useTranslation, useLocalePath } from '@foundation/next';

import siteConfig from '@app/config/site';

const isDevelopment = process.env.NODE_ENV !== 'production';

const baseUrl =
  (isDevelopment ? null : siteConfig.baseUrl) ?? 'http://localhost:3000';

const baseStudioUrl =
  (isDevelopment ? null : process.env.NEXT_PUBLIC_SANITY_STUDIO_URL) ??
  'http://localhost:3333';

const NextPreview = ({ previewOptions }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const path = useLocalePath();

  const { enabled, studioUrl } = previewOptions ?? {};
  if ((enabled && studioUrl) || router.isPreview) {
    const sourceUrl = joinUrl(baseUrl, path);
    const targetUrl = studioUrl ? joinUrl(baseStudioUrl, studioUrl) : null;
    const exitUrl = `/api/sanity/exit?source=${encodeURIComponent(sourceUrl)}`;
    return (
      <div className="p-3 uk-flex uk-flex-middle uk-section-secondary uk-light uk-text-small">
        <div className="uk-flex uk-flex-middle uk-width-expand@s">
          <span className="uk-margin-small-right" uk-icon="icon: bolt" />{' '}
          {t('common:preview.message')}
        </div>
        {targetUrl && (
          <a
            href={targetUrl}
            className="uk-icon-link"
            uk-icon="pencil"
            title={t('common:preview.edit')}
          />
        )}
        <a
          href={exitUrl}
          className="uk-icon-link uk-margin-small-left"
          uk-icon="close"
          title={t('common:preview.exit')}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default NextPreview;
