const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const fs      = require('fs');
const package  = JSON.parse(fs.readFileSync('./package.json'));
const config   = {
    theme: package.theme,
    script: {
        in: __dirname + '/src/assets/js',
        out: __dirname + '/wp-content/themes/' + package.theme + '/assets/js'
    }
};

module.exports = {
    entry: {
        app: config.script.in + '/app.js'
    },
    output: {
        filename: '[name].js',
        path: config.script.out
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MinifyPlugin({},{
            comments: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', ['es2015',{modules: false}]],
                    plugins: ["transform-class-properties","transform-runtime"]
                }
            },
            {
                test: /\.exec\.js$/,
                use: [ 'script-loader' ]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    performance: {
        hints: false
    },
};
