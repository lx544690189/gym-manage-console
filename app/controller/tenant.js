const Controller = require('egg').Controller;
const { success, error, mapValue } = require('../../utils/index');

class TenantController extends Controller {

  // 获取租户列表
  async list() {
    const { ctx } = this;
    const entity = mapValue([ 'tenantName', 'userName' ], ctx.request.body);
    const result = await ctx.service.tenant.list(entity);
    ctx.body = success({
      data: result,
    });
  }

  // 新增租户
  async add() {
    const { ctx } = this;
    const entity = mapValue([ 'tenantName', 'tenantPhone', 'userName', 'userMobile' ], ctx.request.body);
    await ctx.service.tenant.create(entity);
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

module.exports = TenantController;
