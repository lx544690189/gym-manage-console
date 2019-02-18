const { getWhereLikeSql } = require('../../utils/index');
const Service = require('egg').Service;

class Lecture extends Service {
  // 新增
  async create(lecture) {
    await this.ctx.model.Lecture.create(lecture);
  }

  // 更新
  async update(lecture) {
    const find = await this.ctx.model.Lecture.findOne({
      where: {
        id: lecture.id,
      },
    });
    if (find) {
      await find.update(lecture);
    }
  }

  // 分页列表
  async list({ pageNumber = 1, pageSize = 10, title, description }) {
    return this.ctx.model.Lecture.findAndCountAll({
      offset: (pageNumber - 1) * 10,
      limit: pageSize,
      order: [[ 'created_at', 'desc' ]],
      where: getWhereLikeSql({ title, description }),
    });
  }
}

module.exports = Lecture;
