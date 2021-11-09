import { define, defineQuery } from '@atelierfabien/next-sanity';
import groq from 'groq';

import {
  getPageProps,
  pick,
  lookup,
  mergeObjects,
  isBlank,
  isEmpty,
} from '@foundation/next';

import {
  getPageLayout,
  getPageType,
  getPageNavigation,
  getOpengraphImage,
} from '@app/lib/page';

import {
  coreProperties,
  pagePredicate,
  pageProjection,
} from '@app/sanity/queries';

import { resolveCollectionQuery } from '@app/sanity/types/collection';

import { defaultLocale } from '@root/i18n';

// Resolving

export const predicate = pagePredicate;

export const projection = pageProjection;

const options = { predicate, projection, defaultLocale };

const sectionResolvers = new Map();

sectionResolvers.set('section.collection', async (client, section, options) => {
  const { collection } = section;

  if (collection && isEmpty(collection.items) && !isEmpty(collection.query)) {
    const resolved = await resolveCollectionQuery(client, collection, options);
    return { ...section, collection: resolved };
  } else {
    return section;
  }
});

export const resolveSections = async (client, sections = [], options = {}) => {
  const { locale = defaultLocale } = options;
  const opts = { locale };

  const promises = sections.map(s => {
    const resolver = sectionResolvers.get(s._type);
    if (typeof resolver === 'function') {
      return Promise.resolve(resolver(client, s, opts));
    } else {
      return s;
    }
  });

  return Promise.all(promises);
};

export async function resolveProps(item = {}, context = {}) {
  const { node, locale, locales, router = {} } = context;

  const canonicalUrl =
    typeof router.path === 'string' ? null : `/${locale}/pages/${item.alias}`;

  const localizedUrls = locales.reduce((memo, locale) => {
    const path = lookup(node, ['i18n', locale, 'path']);
    if (!isBlank(path)) memo[locale] = path;
    return memo;
  }, {});

  const props = pick(item, coreProperties);

  // Page layout, mapped to site layout component
  const pageLayout = getPageLayout(item);

  // Page type, mapped to page component
  const pageType = getPageType(item);

  // Use page assets, or fall back to layout assets
  const assets = lookup(item, ['assets'], ['layout', 'assets']);

  // Use navigation reference from page, or fallback to layout reference
  const navigation = getPageNavigation(item);

  // Lookup social media image
  const openGraphImage = getOpengraphImage(item) ?? null;

  // Use page sections, or fall back to layout sections
  const sections = lookup(item, ['sections'], ['layout', 'sections']);

  const resolvedSections = await resolveSections(this.client, sections, {
    locale,
  });

  return getPageProps(context, {
    page: {
      ...props,
      alias: item.alias,
      type: pageType,
      title: item.content?.title ?? null,
      subtitle: item.content?.subtitle ?? null,
      content: item.content ?? null,
      sections: resolvedSections,
      images: item.images ?? [],
      files: item.files ?? [],
      links: item.links ?? [],
      pages: item.pages ?? [],
      layout: item.layout ?? null,
      fragments: item.fragments ?? {},
      navigation,
    },
    assets: assets ?? [],
    seo: mergeObjects(node?.seo, item.seo, { image: openGraphImage }),
    router: {
      canonical: canonicalUrl,
      locales: localizedUrls,
      ...router,
    },
    pageLayout,
    pageType,
  });
}

// Methods

const get = defineQuery('id', options);

const getByAlias = defineQuery('alias', options);

const fetch = defineQuery('all', options);

const getStaticPaths = defineQuery('staticPaths', {
  ...options,
  query: groq`standalone != true`,
  projection: groq`_id, _type, alias, 'updatedAt': coalesce(item->_updatedAt, _updatedAt)`,
  property: ['alias'],
});

export default define({
  get,
  getByAlias,
  fetch,
  getStaticPaths,
  resolveProps,
});
