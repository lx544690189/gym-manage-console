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
};
