'use strict';

function* recursiveIterateBundles(bundle) {
  if (bundle.name && bundle.totalSize) {
    yield bundle;
  }
  for (let child of bundle.childBundles) {
    yield* recursiveIterateBundles(child);
  }
};

module.exports = function(mainBundle, callback) {
  Array.from(recursiveIterateBundles(mainBundle)).map(childBundle => callback(childBundle));
};
