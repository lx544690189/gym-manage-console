const Controller = require('egg').Controller;
const { success } = require('../../utils/returnData');

class AccountsController extends Controller {

  // 登录后重定向地址，返回用户信息
  async getUserInfo() {
    const { ctx } = this;
    ctx.body = success({
      data: {
        ...ctx.user,
        password: undefined,
      },
    });
  }

  // 退出登录
  async logout() {
    const { ctx } = this;
    ctx.logout();
    ctx.body = success({
      message: '退出登录成功！',
    });
  }

  // 获取用户列表
  async list() {
    const { ctx } = this;
    const { pageNumber = 1, pageSize = 10 } = ctx.request.body;
    const result = await ctx.service.accounts.list({
      pageNumber,
      pageSize,
    });

    ctx.body = success({
      data: result,
    });
  }

  // 新增用户
  async add() {
    const { ctx } = this;
    const { name, sex, mobile, birthday } = ctx.request.body;
    const result = await ctx.service.accounts.create({ name, sex, mobile, birthday });
    ctx.body = result;
  }

}

module.exports = AccountsController;
