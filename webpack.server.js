const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    //Inform webpack that we are building a bundle for nodejs, rather than for browser
    //for node js it will be little different
    target:'node',
    //tell webpack the root file of our server application
    entry: './src/index.js',
    //tell webpack where to put the output file that is generated
    output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'build')
    },
    // this rule tells anything that is in nodemodules directory will not gets into it
    externals: [webpackNodeExternals()]
    
}

module.exports = merge(baseConfig, config);
