const Controller = require('egg').Controller;
const { success } = require('../../utils/index');

class AddressController extends Controller {

  // 省市区三级数据
  async treeData() {
    const { ctx } = this;
    const result = await ctx.service.address.findAddressTreeData();
    ctx.body = success({
      data: result,
    });
  }

}

module.exports = AddressController;
