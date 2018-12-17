const { success, error } = require('../../utils/returnData');
const Service = require('egg').Service;

class Accounts extends Service {
  async login(where) {
    const account = await this.ctx.model.Accounts.findOne({
      where,
    });
    if (!account) {
      return error({ message: '用户名或密码错误！' });
    }
    return success({
      data: account,
    });
  }

  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Accounts.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ]],
    });
  }
}

module.exports = Accounts;
