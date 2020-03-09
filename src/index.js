'use strict';

require('dotenv-expand')(require('dotenv').config());

const iterateBundles = require('./iterateBundles');
const uploadSourceMap = require('./uploadSourceMap');

module.exports = function(bundler) {
  const apiKey = process.env.HONEYBADGER_API_KEY;
  const assetBaseUrl = process.env.HONEYBADGER_ASSET_BASE_URL;
  const revision = process.env.HONEYBADGER_REVISION;
  const { logLevel, publicURL } = bundler.options;

  if (!apiKey || !assetBaseUrl) {
    if (logLevel > 1) {
      console.log('Honeybadger API Key or asset base URL not configured');
    }
    return;
  }

  const options = {
    apiKey,
    assetBaseUrl,
    revision,
    publicURL,
    logLevel
  };

  bundler.on('bundled', (parentBundle) => {
    iterateBundles(parentBundle, (bundle) => {
      if (bundle.type === 'map' && bundle.parentBundle.type === 'js') {
        uploadSourceMap(bundle, options);
      };
    });
  });
};
