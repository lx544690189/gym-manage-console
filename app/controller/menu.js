const Controller = require('egg').Controller;
const { success, error, mapValue } = require('../../utils/index');

class MenuController extends Controller {

  // 获取菜单列表
  async list() {
    const { ctx } = this;
    const entity = mapValue([ 'name' ], ctx.request.body);
    const result = await ctx.service.menu.list(entity);
    ctx.body = success({
      data: result,
    });
  }

  // 新增主菜单
  async addMenu() {
    const { ctx } = this;
    const entity = mapValue([ 'name' ], ctx.request.body);
    await ctx.service.menu.create(entity);
    ctx.body = success();
  }

  // 新增子菜单
  async addSubMenu() {
    const { ctx } = this;
    const entity = mapValue([ 'pId', 'name', 'icon', 'url', 'orderId' ], ctx.request.body);
    await ctx.service.subMenu.create(entity);
    ctx.body = success();
  }

  // 更新主菜单信息
  async updateMenu() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'name', 'orderId' ], ctx.request.body);
    await ctx.service.menu.update(entity);
    ctx.body = success();
  }

  // 更新子菜单信息
  async updateSubMenu() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'name', 'icon', 'url', 'orderId' ], ctx.request.body);
    await ctx.service.subMenu.update(entity);
    ctx.body = success();
  }

  // 更新租户信息
  async update() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'tenantName', 'tenantPhone', 'userName', 'userMobile' ], ctx.request.body);
    if (entity.id) {
      await ctx.service.tenant.update(entity);
      ctx.body = success();
    } else {
      ctx.body = error({
        message: 'id不能为空！',
      });
    }
  }

}

module.exports = MenuController;
