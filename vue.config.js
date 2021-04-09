const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  outputDir: 'dist',
  devServer: {
    disableHostCheck: true, //  新增该配置项
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100,
            propList: ['*'],
          }),
        ],
      },
    },
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias.set('@', resolve('src'));
  },
};
