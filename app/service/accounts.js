const { success, error } = require('../../utils/returnData');
const Service = require('egg').Service;

class Accounts extends Service {
  async login(where) {
    const Accounts = await this.ctx.model.Accounts.findOne({
      where,
    });
    if (!Accounts) {
      return error({ message: '用户名或密码错误！' });
    }
    return success({
      data: Accounts,
    });
  }
}

module.exports = Accounts;
