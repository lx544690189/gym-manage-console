const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 挂载 strategy
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
    // console.log('user: ', user);
    return user;
  });
  app.passport.deserializeUser(async (ctx, user) => {
    // console.log('user: ', user);
    return user;
  });
};
