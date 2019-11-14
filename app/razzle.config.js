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

        // find module rule that runs ts-loader for TS(X) files
        const tsRule = config.module.rules.find(r => 
            new RegExp(r.test).test('test.tsx') && Array.isArray(r.use) && r.use.some(u => u.loader.includes('ts-loader')));

        // run babel-loader before ts-loader to generate propTypes
        tsRule.use.push({
            loader: 'babel-loader',
            options: {
                babelrc: true
            }
        })
        return config;
    },
};
