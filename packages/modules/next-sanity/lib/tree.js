/* eslint-disable array-callback-return */
/* eslint-disable func-names */

import traverse from 'traverse';

export * as tree from 'tree-walk-util';

export { traverse };

export const processResults = data => {
  return traverse(data).map(function (x) {
    if (this.circular || x === null) {
      this.remove();
    } else if (
      x &&
      typeof x === 'object' &&
      x._type === 'slug' &&
      typeof x.current === 'string'
    ) {
      this.update(x.current);
    }
  });
};
