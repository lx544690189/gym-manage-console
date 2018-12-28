
module.exports = appInfo => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1542897211092_1409',
    // 中间件
    middleware: [ 'filter' ],
    // 拦截器配置
    filter: {
      unAuthUtl: [
        '/login',
        '/logout',
      ], // 不需登录鉴权的url
    },
    // 数据库配置
    sequelize: {
      dialect: 'mysql',
      hostname: '127.0.0.1',
      port: 3306,
      database: 'gym',
      username: 'root',
      password: 'password',
      timezone: '+08:00', // 东八时区
    },
    security: {
      csrf: false,
    },
  };
};
