# Honeybadger's Parcel Source Map Plugin

[![npm version](https://img.shields.io/npm/v/parcel-plugin-honeybadger.svg?style=flat)](https://www.npmjs.com/package/parcel-plugin-honeybadger)

This is a [Parcel 1.x](https://parceljs.org/) plugin to upload javascript
sourcemaps to [Honeybadger's](https://honeybadger.io/)
[API endpoint for source maps](https://docs.honeybadger.io/guides/source-maps.html).

## Installation

Install using npm or yarn:

```
yarn add --dev parcel-plugin-honeybadger
```

## Configuration

The plugin takes all of the parameters from environment variables. It supports using [dotenv](https://github.com/motdotla/dotenv) and dotenv-expand since Parcel does that.

The plugin uses the following environment variables to prepare [Honeybadger Sourcemap API](https://docs.honeybadger.io/guides/source-maps.html)'s parameters:

<dl>
  <dt><code>HONEYBADGER_API_KEY</code> (required)</dt>
  <dd>The API key of your Honeybadger project.></dd>

  <dt><code>HONEYBADGER_ASSET_BASE_URL</code> (required)</dt>
  <dd>
    The base URL to production assets (scheme://host[:port]) without trailing slash.
    The plugin combines <code>HONEYBADGER_ASSET_BASE_URL</code> with <code>publicURL</code> and the generated minified js file name to build the API parameter <code>minified_url</code>
  </dd>

  <dt><code>HONEYBADGER_REVISION</code> (optional)</dt>
  <dd>The deploy revision (i.e. commit sha) that your source map applies to. This could also be a code version. For best results, set it to something unique every time your code changes.</dd>
</dl>
