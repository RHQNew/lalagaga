/**
 * Created by acer acer on 2018/2/24.
 */
var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var config={
	entry:['./app/index.js'],//入口文件
	output:{
		path:path.resolve(__dirname,'dist'), //一个打包文件的绝对路径
		filename:'bundleOnline.js'              //输出文件的名字
	},
	module:{
		//制定文件的规则
		rules:[
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
}

module.exports = config;