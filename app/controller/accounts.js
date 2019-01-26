const Controller = require('egg').Controller;
const md5 = require('md5');
const { success, error, mapValue } = require('../../utils/index');

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
    const { pageNumber = 1, pageSize = 10, userName, mobile } = ctx.request.body;
    const result = await ctx.service.accounts.list({
      pageNumber,
      pageSize,
      userName,
      mobile,
    });

    ctx.body = success({
      data: result,
    });
  }

  // 新增用户
  async add() {
    const { ctx } = this;
    const entity = mapValue([ 'mobile', 'name', 'sex', 'birthday' ], ctx.request.body);
    const result = await ctx.service.accounts.create(entity);
    ctx.body = result;
  }

  // 更新用户信息
  async update() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'name', 'sex', 'birthday' ], ctx.request.body);
    const result = await ctx.service.accounts.update(entity);
    ctx.body = result;
  }

  // 重置用户密码
  async resetPassword() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'mobile' ], ctx.request.body);
    if (!entity.mobile) {
      ctx.body = error({
        message: '手机号不能为空！',
      });
      return;
    }
    entity.password = md5(entity.mobile.substring(5, 11));
    delete entity.mobile;
    const result = await ctx.service.accounts.update(entity);
    ctx.body = result;
  }

}

module.exports = AccountsController;
