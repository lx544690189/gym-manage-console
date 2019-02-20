const LocalStrategy = require('passport-local').Strategy;
class GymApp {
  constructor(app) {
    this.app = app;
  }
  /**
   * @description
    - 所有的插件都已启动完毕，但是应用整体还未 ready
    - 可以做一些数据初始化等操作，这些操作成功才会启动应用
   * @memberof GymApp
   */
  async willReady() {
    initPasspot(this.app);
    initQiniuTask(this.app);
  }
}

module.exports = GymApp;

/**
 * @description 初始化passport插件
 * @param {*} app
 */
function initPasspot(app) {
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, { username, password }) => {
    const response = await ctx.service.accounts.login({ username, password });
    if (response.success) {
      return response.data;
    }
  });
  app.passport.serializeUser(async (ctx, user) => {
    return user;
  });
  app.passport.deserializeUser(async (ctx, user) => {
    return user;
  });
}

/**
 * @description 七牛云获取token定时任务，需要在应用启动时手动执行一次
 * @param {*} app
 */
async function initQiniuTask(app) {
  await app.runSchedule('qiniu');
}
