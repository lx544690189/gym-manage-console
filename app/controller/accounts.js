const Controller = require('egg').Controller;
const { success } = require('../../utils/returnData');

class AccountsController extends Controller {

  // 登录后重定向地址，返回用户信息
  async getUserInfo() {
    const { ctx } = this;
    ctx.body = success({
      data: ctx.user,
    });
  }

}

module.exports = AccountsController;
