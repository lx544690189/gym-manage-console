module.exports = options => {
  return async function filter(ctx, next) {
    await next();
    const { unAuthUtl } = options;
    // 需要登录鉴权的处理
    if (!unAuthUtl.includes(ctx.request.url)) {
      // 是否登录
      if (!ctx.isAuthenticated()) {
        ctx.body = {
          login: false,
          success: false,
          message: '未登录！',
        };
      }
    }
  };
};
