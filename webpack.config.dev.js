// webpack.config.dev.js
module.exports = {
    target: 'webworker',
    entry: './index.js',
    mode: 'production',
    node: {
        fs: 'empty',
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto',
            },
        ],
    },
    optimization: {
        minimize: false
    },
}
