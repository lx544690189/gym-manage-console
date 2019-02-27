const Controller = require('egg').Controller;
const md5 = require('md5');
const { success, error, mapValue } = require('../../utils/index');

class AccountsController extends Controller {

  // 登录
  async login() {
    const { ctx } = this;
    const userInfo = mapValue([ 'username', 'password' ], ctx.request.body);
    const result = await ctx.service.accounts.login(userInfo);
    if (result.success) {
      ctx.login(result.data);
      ctx.body = success();
    } else {
      ctx.body = result;
    }
  }

  // 获取菜单信息、用户信息、七牛token
  async getBaseInfo() {
    const { ctx } = this;
    const { rows } = await ctx.service.menu.list();
    ctx.body = success({
      data: {
        userInfo: ctx.user,
        menu: rows,
        qiniu: {
          token: ctx.app.qiniuUploadToken,
        },
      },
    });
  }

  // 获取当前登录用户信息
  async getUserInfo() {
    const { ctx } = this;
    ctx.body = success({
      data: {
        ...ctx.user,
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
    const userInfo = mapValue([ 'name', 'mobile', 'roleCode' ], ctx.request.body);
    const result = await ctx.service.accounts.list(userInfo);

    ctx.body = success({
      data: result,
    });
  }

  // 新增用户
  async add() {
    const { ctx } = this;
    const entity = mapValue([ 'mobile', 'name', 'sex', 'birthday', 'userImg', 'roleCode' ], ctx.request.body);
    const result = await ctx.service.accounts.create(entity);
    ctx.body = result;
  }

  // 更新用户信息
  async update() {
    const { ctx } = this;
    const entity = mapValue([ 'id', 'name', 'sex', 'birthday', 'userImg', 'roleCode' ], ctx.request.body);
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

  // 账号禁用
  async disable() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.accounts.update({
      id,
      status: 2,
    });
    ctx.body = result;
  }

  // 账号启用
  async enable() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.accounts.update({
      id,
      status: 1,
    });
    ctx.body = result;
  }

}

module.exports = AccountsController;
