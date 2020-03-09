'use strict';

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

function minifiedUrl(bundle, options) {
  const filename = path.basename(bundle.parentBundle.name);
  return `${options.assetBaseUrl}/${path.join(options.publicURL, filename).replace(/^\//, '')}`;
}

module.exports = function(bundle, options) {
  const sourceMapName = path.basename(bundle.name);
  var form = new FormData();

  form.append('api_key', options.apiKey);

  if (options.revision) {
    form.append('revision', options.revision);
  }

  form.append('minified_url', minifiedUrl(bundle, options));
  form.append('source_map', fs.createReadStream(bundle.name));
  form.append('minified_file', fs.createReadStream(bundle.parentBundle.name));

  form.submit('https://api.honeybadger.io/v1/source_maps', (err, res) => {
    var body = res.read();
    switch (res.statusCode) {
      case 401:
        console.log('Invalid HoneyBadger API Key.');
        break;
      case 400:
        console.log(`Failed to upload source map ${sourceMapName} with error: ${body}`);
        break;
      case 201:
        if (options.logLevel > 2) {
          console.log(`Successfully uploaded source map ${sourceMapName} to HoneyBadger.`);
        }
        break;
      default:
        console.log(`HoneyBadger source map upload API returned status code: ${res.statusCode}`);
    }
  });
};
