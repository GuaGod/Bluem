var path = require('path');

module.exports = {
    entry: {
        manage: './src/js/manage.js',
        newDetail: './src/js/newDetail.js',
        application: './src/js/application.js',
        writeNew: './src/js/writeNew.js',
        changeNew: './src/js/changeNew.js',
        blogs: './src/js/blogs.js'
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'app/js'),
        publicPath: "js"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader'
                },
                exclude: '/node_modules/'
            }, {
                test: /\.less$/,
                use:[
                    {
                        loader:'style-loader',
                        options:{
                            singleton:true
                        }
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'less-loader'
                    }
                ],
                exclude: '/node_modules/'
            }, {
                test: /\.css$/,
                use:[{
                    loader:'style-loader',
                    options:{
                        singleton:true
                    }
                }, {
                    loader: 'css-loader',
                }],
                exclude: '/node_modules'
            }
   
        ]

    },

    devServer: {
        contentBase: path.resolve(__dirname, 'app'),
        host: 'localhost',
        compress: true,
        port: 8090,
    },

    externals: {
        'jquery' : 'window.jQuery'
    }

}