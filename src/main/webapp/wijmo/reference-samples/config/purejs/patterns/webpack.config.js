const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    module: {
        rules: [
            { 
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            { 
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' }
                ]
            },
            {
                // to load bootstrap fonts
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000
                        }
                    }
                ]
            }            
        ]
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({  
          template: 'index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'src/partials',
            to: 'partials' 
        }])
    ],
    devServer: {
        contentBase: './dist'
    },
    devtool: "inline-source-map"
};