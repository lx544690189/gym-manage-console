const Service = require('egg').Service;

class SubMenu extends Service {
  // 新增
  async create(subMenu) {
    await this.ctx.model.SubMenu.create(subMenu);
  }

  // 更新
  async update(subMenu) {
    const find = await this.ctx.model.SubMenu.findOne({
      where: {
        id: subMenu.id,
      },
    });
    if (find) {
      await find.update(subMenu);
    }
  }
}

module.exports = SubMenu;
