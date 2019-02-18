const Controller = require('egg').Controller;
const { success, error, mapValue } = require('../../utils/index');

class LectureController extends Controller {

  // 获取课程列表
  async list() {
    const { ctx } = this;
    const entity = mapValue([ 'title' ], ctx.request.query);
    const result = await ctx.service.lecture.list(entity);
    ctx.body = success({
      data: result,
    });
  }

  // 新增课程
  async add() {
    const { ctx } = this;
    const entity = mapValue([ 'title', 'picture', 'maxNum', 'description', 'startTime', 'endTime' ], ctx.request.body);
    await ctx.service.lecture.create(entity);
    ctx.body = success();
  }

  // 更新课程信息
  async updateStatus() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'status' ], ctx.request.body);
    if (entity.id) {
      await ctx.service.lecture.update(entity);
      ctx.body = success();
    } else {
      ctx.body = error({
        message: 'id不能为空！',
      });
    }
  }

}

module.exports = LectureController;
