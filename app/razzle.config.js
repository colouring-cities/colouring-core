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
        webpackConfig.module.rules = webpackConfig.module.rules || [];

        // import file contents as a string with '?raw', as in Vite
        for (const rule of webpackConfig.module.rules) {
            // Razzle's catch-all file-loader rule would otherwise turn it into a URL
            if (rule.exclude && !rule.test) {
                rule.resourceQuery = { not: [/raw/] };
            }
        }
        webpackConfig.module.rules.unshift({
            resourceQuery: /raw/,
            type: 'asset/source'
        });

        // load webfonts
        webpackConfig.module.rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            type: 'asset/resource'
        });

        return webpackConfig;
    },
};
