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
        rules = config.module.rules || [];
        rules.push({
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader?name=public/fonts/[name].[ext]'
        })
        config.module.rules = rules;

        return config;
    },
};
