/* eslint-disable func-names */

import { get, isBlank, mergeObjects, trim } from '@foundation/next';
import groq from 'groq';

export const andPredicate = (...predicates) => {
  const valid = predicates.filter(p => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' && ')})` : '';
};

export const orPredicate = (...predicates) => {
  const valid = predicates.filter(p => !isBlank(p));
  return valid.length > 0 ? `(${valid.join(' || ')})` : '';
};

export const filterPredicate = filter => {
  return isBlank(filter) ? '' : filter;
};

const getParams = (params, options = {}) => {
  const merged = mergeObjects(options, params);
  const { defaultLocale } = merged;
  return { locale: defaultLocale, ...merged };
};

const types = {
  // Fetch multiple
  all: (options = {}) => {
    return function(params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by id
  ids: (options = {}) => {
    return function(ids, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)} && _id in $ids][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, ids, locale, defaultLocale }
      );
    };
  },
  // Fetch one by id
  id: (options = {}) => {
    return function(id, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)} && _id == $id][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, id, locale, defaultLocale }
      );
    };
  },
  // Fetch one by path
  path: (options = {}) => {
    return function(path, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)} &&
            $path in [i18n[$locale].path.current, i18n[$defaultLocale].path.current]][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, path, locale, defaultLocale }
      );
    };
  },
  // Fetch one by alias
  alias: (options = {}) => {
    return function(alias, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)} &&
            $alias in [i18n[$locale].alias.current, i18n[$defaultLocale].alias.current]][0]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, alias, locale, defaultLocale }
      );
    };
  },
  // Fetch multiple by property
  property: (property, options = {}) => {
    return function(value, params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        locale,
        defaultLocale,
      } = getParams(params, options);
      return this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)} && ${property} == $value]{
            ${projection}
          }${filterPredicate(filter)}`,
        { ...params, value, locale, defaultLocale }
      );
    };
  },
  // Get all static paths
  staticPaths: (options = {}) => {
    const property = options.property ?? ['path', 'current'];
    return async function(params = {}) {
      const {
        query,
        predicate,
        projection,
        filter,
        defaultLocale,
        locales,
      } = getParams(params, options);

      if (!locales.includes(defaultLocale)) locales.unshift(defaultLocale);

      const documents = await this.client.fetch(
        groq`
          *[${andPredicate(predicate, query)}]{
            ${projection}
          }${filterPredicate(filter)}`,
        params
      );

      return documents.reduce((memo, node) => {
        locales.forEach(locale => {
          const i18n = node?.i18n ?? {};
          const merged = mergeObjects(i18n[defaultLocale], i18n[locale]);
          const path = trim(get(merged, property, ''), '/');
          if (!isBlank(path)) {
            memo.push({ params: { path: path.split('/') }, locale });
          }
        });
        return memo;
      }, []);
    };
  },
};

export const defineQuery = (type, options = {}) => {
  if (typeof types[type] === 'function') {
    return types[type](options);
  } else {
    throw new Error(`Invalid query type: ${type}`);
  }
};
