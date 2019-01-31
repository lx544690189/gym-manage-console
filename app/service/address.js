const Service = require('egg').Service;
const { getWhereSql } = require('../../utils/index');

class Address extends Service {
  // 获取省市区三级树形数据
  async findAddressTreeData({ provinceCode, cityCode, districtCode } = {}) {
    return this.ctx.model.Province.findAll({
      include: [{
        model: this.app.model.City,
        attributes: [ 'value', 'label' ],
        as: 'children', // 加载主图，名称拼写必须与关联关系中命名相同
        where: getWhereSql({ code: cityCode }),
        include: [{
          model: this.app.model.District,
          attributes: [ 'value', 'label' ],
          as: 'children', // 加载主图，名称拼写必须与关联关系中命名相同
          where: getWhereSql({ code: districtCode }),
        }],
      }],
      where: getWhereSql({ code: provinceCode }),
    });
  }
}

module.exports = Address;
