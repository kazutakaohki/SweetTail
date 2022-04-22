/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

// ここから追加

// const webpack = require("webpack");
// require("dotenv").config();

// module.exports = {
//   webpack: (config) => {
//     const env = Object.keys(process.env).reduce((acc, curr) => {
//       acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
//       return acc;
//     }, {});

//     config.plugins.push(new webpack.DefinePlugin(env));

//     return config;
//   },
// };

// ここまで追加

module.exports = nextConfig;
