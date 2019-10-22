const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new vueLoaderPlugin()
    ],
    module: {
        rules: [
            //shift alt f 代码对其
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(jpg|png|gif)$/, use: 'url-loader?limit=1024&name=[hash:8]-[name].[ext]' },
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            //{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ } // 配置babel，来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' } //处理.vue文件的loader
        ]
    },
    // resolve: {
    //     alias: {
    //         "vue$": "vue/dist/vue.js"
    //     }
    // }
}