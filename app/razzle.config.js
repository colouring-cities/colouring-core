const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        {
            name: "typescript",
            options: {
                useBabel: true,
                useEslint: true,
                forkTsChecker: {
                    tsconfig: "./tsconfig.json",
                    tslint: undefined,
                    watch: "./src",
                    typeCheck: true,
                },
            },
        },
    ],
    modify: (config, { target, dev }, webpack) => {
        // load webfonts
        const rules = config.module.rules || [];
        rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=public/fonts/[name].[ext]'
        })
        config.module.rules = rules;

        // add the map_styles directory to the build output
        const plugins = config.plugins || [];
        plugins.push(new CopyWebpackPlugin({
            patterns: [ {from: 'map_styles', to: "map_styles"}]
        }));
        config.plugins = plugins;

        return config;
    },
};
