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
  // 通用接口
  router.post('/upload', controller.common.upload);
  router.get('/getUploadToken', controller.common.getUploadToken);
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
  // 菜单
  router.get('/menu/list', controller.menu.list);
  router.post('/menu/addMenu', controller.menu.addMenu);
  router.post('/menu/addSubMenu', controller.menu.addSubMenu);
  router.post('/menu/updateMenu', controller.menu.updateMenu);
  router.post('/menu/updateSubMenu', controller.menu.updateSubMenu);
  // 课程
  router.get('/lecture/list', controller.lecture.list);
  router.post('/lecture/add', controller.lecture.add);
  router.post('/lecture/updateStatus', controller.lecture.updateStatus);
};
