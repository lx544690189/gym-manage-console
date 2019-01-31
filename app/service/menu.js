const { getWhereLikeSql } = require('../../utils/index');
const Service = require('egg').Service;

class Menu extends Service {
  // 新增
  async create(menu) {
    console.log('menu: ', menu);
    await this.ctx.model.Menu.create(menu);
  }

  // 更新
  async update(menu) {
    const find = await this.ctx.model.Menu.findOne({
      where: {
        id: menu.id,
      },
    });
    if (find) {
      await find.update(menu);
    }
  }

  // 分页列表
  async list({ name }) {
    return this.ctx.model.Menu.findAndCountAll({
      include: [{
        model: this.app.model.SubMenu,
        as: 'children',
      }],
      order: [[ 'orderId' ]],
      where: getWhereLikeSql({ name }),
    });
  }
}

module.exports = Menu;
