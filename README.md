# gym-project

## Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

## 相关技术
  - 框架：[eggjs](https://eggjs.org/zh-cn/intro/quickstart.html)
  - 数据库：mysql
  - 数据库ORM: [Sequelize](https://itbilu.com/nodejs/npm/VkYIaRPz-.html#induction)
  - 对象存储：七牛云
  - 登录状态：基于session，将扩展token登录

## task
- [x] 员工管理
- [ ] 会员管理
- [ ] 会员卡管理
- [ ] 资金流水
- [ ] 意向客户管理
- [x] session登录、退出
- [ ] token登录
- [x] middleware：未登录拦截
- [x] 省市区相关地址接口
- [x] 七牛云上传下载、schedule任务获取token
- [x] 菜单管理
- [x] 角色管理
- [x] 租户管理
- [x] 课程管理
- [ ] 衣柜管理
- [ ] 商品管理
- [ ] 积分管理
- [ ] 来访记录
- [ ] 员工绩效
- [ ] more...

## 注意事项记录
- 框架默认启用csrf验证，若使用需在异步请求头部加上'x-csrf-token'，form表单的话加上_csrf字段。
- [egg-passport](https://github.com/eggjs/egg-passport)登录后需要指定跳转url，对于ajax登录方式没必要重定向。暂时没找到如何配置，登录未使用此插件。
- 如果你的模型对象中表名未加s，Sequelize默认会加上的，可通过配置`freezeTableName: true`来禁止此功能。
- insert、update表时，Sequelize将自动更新列`created_at`、`updated_at`，若表中无此字段，可配置`timestamps: false`禁止。