const Controller = require('egg').Controller;
const { success, error, mapValue } = require('../../utils/index');

class RoleController extends Controller {

  // 列表
  async list() {
    const { ctx } = this;
    const result = await ctx.service.role.list();
    ctx.body = success({
      data: result,
    });
  }

  // 新增
  async add() {
    const { ctx } = this;
    const entity = mapValue([ 'name', 'code' ], ctx.request.body);
    await ctx.service.role.create(entity);
    ctx.body = success();
  }

  // 更新
  async update() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'name', 'code' ], ctx.request.body);
    if (entity.id) {
      await ctx.service.role.update(entity);
      ctx.body = success();
    } else {
      ctx.body = error({
        message: 'id不能为空！',
      });
    }
  }

}

module.exports = RoleController;
