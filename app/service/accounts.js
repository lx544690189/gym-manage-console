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

  async list({ pageNumber = 1, pageSize = 10 }) {
    return this.ctx.model.Accounts.findAndCountAll({
      offset: (pageNumber - 1) * 10,
      limit: pageSize,
      order: [[ 'created_at', 'desc' ]],
    });
  }

  async create(accounts) {
    accounts.username = accounts.mobile;
    accounts.password = accounts.mobile.substring(5, 11);
    const find = await this.ctx.model.Accounts.findOne({ where: {
      username: accounts.username,
    } });
    if (find) {
      return error({ message: '用户已存在！' });
    }
    await this.ctx.model.Accounts.create(accounts);
    return success();
  }
}

module.exports = Accounts;
