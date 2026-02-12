const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    plugins: [
        {
            name: 'typescript',
            options: {
                forkTsChecker: {
                    eslint: undefined // { files: './src/**/*.{ts,tsx,js,jsx}' }
                },
            },
        },
    ],
    modifyWebpackConfig({ env: { target, dev }, webpackConfig }) {
        // load webfonts
        webpackConfig.module.rules = webpackConfig.module.rules || [];
        webpackConfig.module.rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource'
        });

        // add the map_styles directory to the build output
        const plugins = webpackConfig.plugins || [];

        plugins.push(new CopyPlugin({
            patterns: [ {from: 'map_styles', to: 'map_styles'}]
        }));
        webpackConfig.plugins = plugins;

        plugins.push(new webpack.DefinePlugin({
            'process.env.SUBDIRECTORY': JSON.stringify(process.env.SUBDIRECTORY)
        }));

        return webpackConfig;
    },
};
