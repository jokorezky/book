import express from 'express';
import cookieParser from 'cookie-parser';
const server = express();
server.use(cookieParser());
import path from 'path';
var fs = require('fs')
var https = require('https')
const expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client.js';
import configDevServer from '../../config/webpack.dev-server.js';
import configProdClient from '../../config/webpack.prod-client.js';
import configProdServer from '../../config/webpack.prod-server.js';

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
console.log(isProd)
const PORT = process.env.PORT || 8085;
// const PORT = process.env.PORT || 8081;
let isBuilt = false;

const done = () => {
	!isBuilt &&
		server.listen(PORT, () => {
			console.log('ini adalah' + isProd)
			isBuilt = true;
			console.log(`Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`);
		});
};

if (isDev) {
	console.log('masuk');
	const compiler = webpack([configDevClient, configDevServer]);

	const clientCompiler = compiler.compilers[0];
	const serverCompiler = compiler.compilers[1];

	const webpackDevMiddleware = require('webpack-dev-middleware')(
		compiler,
		configDevClient.devServer,
	);

	const webpackHotMiddlware = require('webpack-hot-middleware')(
		clientCompiler,
		configDevClient.devServer,
	);

	server.use(webpackDevMiddleware);
	server.use(webpackHotMiddlware);
	server.use(webpackHotServerMiddleware(compiler));
	
	
	done();
} else {
	console.log('masuk else')
	webpack([configProdClient, configProdServer]).run((err, stats) => {
		const clientStats = stats.toJson().children[0];
		const render = require('../../build/prod-server-bundle.js').default;
		// console.log(
		// 	stats.toString({
		// 		colors: true,
		// 	}),
		// );
		server.use(
			expressStaticGzip('dist', {
				enableBrotli: true
			}),
		);
		server.use(render({ clientStats }));
		done();
	});
}
