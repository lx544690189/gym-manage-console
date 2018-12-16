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

}

module.exports = AccountsController;
