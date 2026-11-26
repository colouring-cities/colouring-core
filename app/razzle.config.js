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
        const rules = webpackConfig.module.rules || [];

        // load webfonts
        rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource'
        });

        // import file contents as a string with '?raw', as in Vite.
        // oneOf stops at the first match, so a '?raw' import is never also
        // handled by babel, url-loader, file-loader or the webfont rule
        webpackConfig.module.rules = [{
            oneOf: [
                {
                    resourceQuery: /^\?raw$/,
                    type: 'asset/source'
                },
                { rules }
            ]
        }];

        return webpackConfig;
    },
};
