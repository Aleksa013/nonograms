const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = ['index'];



module.exports = {
  entry: pages.reduce((config, page)=>{
    config[page] = `./src/${page}.js`;
    return config;
  },{}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  mode: 'development',
  resolve:{
    extensions: ['.js', '.json'],
  },
  optimization:{
    splitChunks:{
      chunks: 'all',
    }
  },
  module:{
    rules:[
      {
      test:/\.html$/,
      use:[
        {
          loader:'html-loader',
          options: {minimize: false},
      },
    ]
    },{
      test:/\.s[ac]ss$/i,
      use:[
        "style-loader",
        "css-loader",
        "sass-loader",
      {
        loader:'sass-resources-loader',
        options: {
          resources:[
            'src/styles/vars.scss'
          ]
      }
      },
      ]
    },
    {
        test:/\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type:'asset/resource',
        
    },
    {
        test:/\.(woff(2)?|eot|ttf|otf|mp3|wav)$/i,
        type:'asset/resource',
    },
   
   
  ]
  },
  plugins:[].concat(
    pages.map(
      (page)=>
      new HtmlWebpackPlugin({
        template: `./src/${page}.html`,
        filename: `${page}.html`,
        chunks: [page],
      }),
    )
  ),    
  devServer: {
      compress: true,
      port: 9000,
    },
};