const { getWhereLikeSql } = require('../../utils/index');
const Service = require('egg').Service;

class Tenant extends Service {
  /**
   * @typedef {Object} Tenant - tenant class
   * @property {String} name - name
   */

  /**
   * @description
   * @param {*} tenant
   * @memberof Tenant
   */
  async create(tenant) {
    await this.ctx.model.Tenant.create(tenant);
  }

  // 更新
  async update(tenant) {
    const find = await this.ctx.model.Tenant.findOne({
      where: {
        id: tenant.id,
      },
    });
    if (find) {
      await find.update(tenant);
    }
  }

  // 分页列表
  async list({ pageNumber = 1, pageSize = 10, tenantName, userName }) {
    return this.ctx.model.Tenant.findAndCountAll({
      offset: (pageNumber - 1) * 10,
      limit: pageSize,
      order: [[ 'created_at', 'desc' ]],
      where: getWhereLikeSql({ tenantName, userName }),
    });
  }
}

module.exports = Tenant;
