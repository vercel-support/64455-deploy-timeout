import { Link } from '@mono/next';
import { useTranslation } from '@mono/next';

export default function Links() {
  const { t } = useTranslation();

  return (<>
    <Link href="/" as="li">{t('app:pages.home')}</Link>
    <Link href="/about" as="li">{t('app:pages.about')}</Link>
    <Link href="/blog" as="li" partial={true}>{t('app:pages.blog')}</Link>
  </>);
}