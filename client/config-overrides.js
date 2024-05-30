// config-overrides.js
module.exports = function override(config, env) {
    if (env === 'development') {
      config.devServer = {
        ...config.devServer,
        headers: {
          'Cross-Origin-Embedder-Policy': 'unsafe-none'
        }
      };
    }
  
    return config;
  };
  