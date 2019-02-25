const Service = require('egg').Service;

class Role extends Service {
  // 新增
  async create(role) {
    await this.ctx.model.Role.create(role);
  }

  // 更新
  async update(role) {
    const find = await this.ctx.model.Role.findOne({
      where: {
        id: role.id,
      },
    });
    if (find) {
      await find.update(role);
    }
  }

  // 分页列表
  async list({ pageNumber = 1, pageSize = 10 } = {}) {
    return this.ctx.model.Role.findAndCountAll({
      offset: (pageNumber - 1) * 10,
      limit: pageSize,
    });
  }
}

module.exports = Role;
