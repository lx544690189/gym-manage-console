
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
        '/upload',
        '/lecture/add',
        '/lecture/list',
        '/lecture/updateStatus',
      ], // 不需登录鉴权的url
    },
    // 数据库配置
    sequelize: {
      dialect: 'mysql',
      // host: '127.0.0.1',
      host: 'rm-bp1f6i2iqou3j3101go.mysql.rds.aliyuncs.com',
      port: 3306,
      database: 'gym',
      // username: 'root',
      // password: 'password',
      username: 'lx544690189',
      password: 'Lx82213175',
      timezone: '+08:00', // 东八时区
    },
    // 安全认证
    security: {
      csrf: false,
    },
    // 文件上传、下载
    multipart: {
      mode: 'file',
    },
  };
};
