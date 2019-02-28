const { success, error, getWhereLikeSql, getWhereSql } = require('../../utils/index');
const Service = require('egg').Service;

class Accounts extends Service {
  // 登录
  async login(where) {
    const account = await this.ctx.model.Accounts.findOne({
      where,
    });
    if (!account) {
      return error({ message: '用户名或密码错误！' });
    }
    if (account.status !== 1) {
      return error({ message: '您已被管理员禁止登陆！' });
    }
    delete account.password;
    return success({
      data: account,
    });
  }

  // 分页获取用户数据
  async list({ pageNumber = 1, pageSize = 10, name, mobile, roleCode }) {
    return this.ctx.model.Accounts.findAndCountAll({
      offset: (pageNumber - 1) * 10,
      limit: pageSize,
      order: [[ 'created_at', 'desc' ]],
      // where: {
      //   userName: {
      //     // 模糊查询
      //     [Op.like]: `%${userName}%`,
      //   },
      // },
      where: {
        ...getWhereLikeSql({ name, mobile, roleCode }),
        ...getWhereSql({ roleCode }),
      },
    });
  }

  // 新增用户
  async create(accounts) {
    accounts.username = accounts.mobile;
    accounts.password = accounts.mobile.substring(5, 11);
    const find = await this.ctx.model.Accounts.findOne({
      where: {
        username: accounts.username,
      },
    });
    if (find) {
      return error({ message: '手机号已被注册！' });
    }
    await this.ctx.model.Accounts.create(accounts);
    return success();
  }

  // 修改用户信息
  async update(accounts) {
    if (!accounts.id) {
      return error({ message: 'id不能为空！' });
    }
    if (accounts.mobile) {
      accounts.username = accounts.mobile;
    }
    const find = await this.ctx.model.Accounts.findOne({
      where: {
        id: accounts.id,
      },
    });
    if (find) {
      await find.update(accounts);
    }
    return success();
  }
}

module.exports = Accounts;
