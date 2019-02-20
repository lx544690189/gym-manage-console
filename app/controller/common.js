/**
 * 通用接口
 */
const Controller = require('egg').Controller;
const { success, error } = require('../../utils/index');
// const fs = require('mz/fs');
const path = require('path');

class CommonController extends Controller {

  // 测试本地上传文件
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = path.basename(file.filename);
    // let result;
    // try {
    //   // 处理文件，比如上传到云端
    //   result = await ctx.oss.put(name, file.filepath);
    // } finally {
    //   // 需要删除临时文件
    //   await fs.unlink(file.filepath);
    // }

    ctx.body = {
      name,
    };
  }

  // 获取上传时所需token
  async getUploadToken() {
    const { ctx } = this;
    const token = ctx.app.qiniuUploadToken;
    if (ctx.app.qiniuUploadToken) {
      ctx.body = success({
        data: {
          token,
        },
      });
    } else {
      ctx.body = error({
        message: '获取token失败，请稍后重试！',
      });
    }
  }
}

module.exports = CommonController;
