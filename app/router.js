'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // index
  router.get('/', controller.home.index);
  // test
  router.get('/test/get', controller.test.get);
  router.post('/test/post', controller.test.post);
  // account-
  router.get('/account/getUserInfo', controller.accounts.getUserInfo);
  router.get('/logout', controller.accounts.logout);
  // 登录校验
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/account/getUserInfo' }));
};
