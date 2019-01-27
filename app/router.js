'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录校验
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/account/getUserInfo' }));
  // index
  router.get('/', controller.home.index);
  // test
  router.get('/test/get', controller.test.get);
  router.post('/test/post', controller.test.post);
  // 公共查询数据
  router.get('/address/treeData', controller.address.treeData);
  // account-
  router.get('/account/getUserInfo', controller.accounts.getUserInfo);
  router.get('/logout', controller.accounts.logout);
  router.post('/account/list', controller.accounts.list);
  router.post('/account/add', controller.accounts.add);
  router.post('/account/update', controller.accounts.update);
  router.post('/account/resetPassword', controller.accounts.resetPassword);
  // 租户
  router.get('/tenant/list', controller.tenant.list);
  router.post('/tenant/add', controller.tenant.add);
  router.post('/tenant/update', controller.tenant.update);
};
