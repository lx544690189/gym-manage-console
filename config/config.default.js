'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542897211092_1409';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    hostname: '127.0.0.1',
    port: 3306,
    database: 'gym',
    username: 'root',
    password: 'password',
  };

  // config.security = {
  //   csrf: false,
  // };

  return config;
};
