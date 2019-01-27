const Service = require('egg').Service;

class Address extends Service {
  // 获取省市区三级树形数据
  async findAddressTreeData() {
    return this.ctx.model.Province.findAll({
      include: [{
        model: this.app.model.City,
        include: [{
          model: this.app.model.District,
        }],
      }],
    });
  }
}

module.exports = Address;
