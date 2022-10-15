// /* config-overrides.js */

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": false
  };
  return config;
}