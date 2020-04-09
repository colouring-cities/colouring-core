module.exports = {
    plugins: ['typescript'],
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
