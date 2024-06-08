const path = require('path');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    // Add webpack aliases for folders in 'src'
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    config.resolve.alias['src'] = path.resolve(__dirname, 'src');
    config.resolve.alias['actions'] = path.resolve(__dirname, 'src/actions');
    config.resolve.alias['reducers'] = path.resolve(__dirname, 'src/reducers');
    config.resolve.alias['config'] = path.resolve(__dirname, 'src/config');

    // Additional webpack configurations can be added here if needed
    config.resolve.modules = [path.resolve('./src'), path.resolve('./node_modules')];
    config.resolve.extensions = ['', '.js', '.jsx'];

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
