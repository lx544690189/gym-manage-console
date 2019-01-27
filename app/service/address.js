const Service = require('egg').Service;

class Address extends Service {
  // 获取省市区三级树形数据
  async findAddressTreeData() {
    return this.ctx.model.Province.findAll({
      include: [{
        model: this.app.model.City,
        attributes: [ 'name', 'code' ],
        as: 'children', // 加载主图，名称拼写必须与关联关系中命名相同
        include: [{
          model: this.app.model.District,
          attributes: [ 'name', 'code' ],
          as: 'children', // 加载主图，名称拼写必须与关联关系中命名相同
        }],
      }],
    });
  }
}

module.exports = Address;
