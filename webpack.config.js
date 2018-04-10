var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin= require('html-webpack-plugin')
//html引用的外部资源script，link动态添加每次compile后的hash，防止引用缓存的文件
//生成html入口文件，单页面就是一个html入口，n个html-webpack-plugin就是n个页面入口
var TMP_PATH = path.resolve(__dirname,'./template/index.html')
//这个是html入口文件的路径
var config={
	entry:{
		app:'./app/index.js',
	    vendor:['react','react-dom']
	},//入口文件
	output:{
		path:path.resolve(__dirname,'dist'), //一个打包文件的绝对路径
		filename:'[name].js'              //输出文件的名字
	},
	module:{
		//制定文件的规则
		rules:[
			//{
			//test:
			//loaders:[]
			//include:
			//}
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader'],
				include: path.resolve(__dirname, 'app')
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
				title:'mine website',
				template: TMP_PATH,
				filename: 'index.html',
				chunks: ['app','vendor'],
				inject: 'body'
			}
			)
	]
}

module.exports = config;