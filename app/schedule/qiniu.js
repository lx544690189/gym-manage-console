const Subscription = require('egg').Subscription;
const qiniu = require('qiniu');
const {
  qiniuConfig: {
    accessKey,
    secretKey,
  },
} = require('../../config/sysConfig');

// 生成鉴权对象mac
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  // 资源域名称bucket
  scope: 'gym-resources',
  // 凭证有效期一天（防止时间同步误差，多申请1分钟）
  expires: 24 * 60 * 60 + 1 * 60,
  // 自定义返回的json格式
  returnBody: JSON.stringify({
    name: '$(fname)', // 上传的原始文件名
    size: '$(fsize)', // 资源尺寸，单位为字节
    width: '$(imageInfo.width)', // 图片宽度
    height: '$(imageInfo.height)', // 图片高度
    imageAve: '$(imageAve)', // 图片主色调
    type: '$(mimeType)', // 资源类型
    key: '$(key)', // 文件保存在空间中的资源名
    hash: '$(etag)', // 文件hash值
    bucket: '$(bucket)', // 上传的目标空间名
  }),
};

/**
 * @description 七牛云服务定时获取token
 * @class InitQiniu
 * @extends {Subscription}
 */
class InitQiniu extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '24h', // 时间间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    this.logger.info('定时获取七牛云token');
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    this.ctx.app.qiniuUploadToken = uploadToken;
  }
}

module.exports = InitQiniu;
