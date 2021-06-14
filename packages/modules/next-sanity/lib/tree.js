/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import traverse from 'traverse';

export * as tree from 'tree-walk-util';

export { default as traverse } from 'traverse';

export const cleanupData = data => {
  return traverse(data).map(function(x) {
    if (this.circular || x === null) this.remove();
  });
};
