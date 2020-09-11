module.exports = {
    // css: {
    //   loaderOptions: {
    //     postcss: {
    //       plugins: [
    //         require('postcss-pxtorem')({
    //           rootValue: 37.5,
    //           unitPrecision: 5,
    //           propList: ['*'],
    //           selectorBlackList: [''],
    //           replace: true,
    //           mediaQuery: false,
    //           minPixelValue: 0,
    //           exclude: /node_modules/i
    //         })
    //       ]
    //     }
    //   }
    // },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '/api': '/'
          }
        }
      }
    }
  }