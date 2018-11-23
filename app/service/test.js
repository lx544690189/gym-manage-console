const Service = require('egg').Service;

class Test extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Test.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const Test = await this.ctx.model.Test.findByPk(id);
    if (!Test) {
      this.ctx.throw(404, 'Test not found');
    }
    return Test;
  }

  async create(Test) {
    return this.ctx.model.Test.create(Test);
  }

  async update({ id, updates }) {
    const Test = await this.ctx.model.Test.findById(id);
    if (!Test) {
      this.ctx.throw(404, 'Test not found');
    }
    return Test.update(updates);
  }

  async del(id) {
    const Test = await this.ctx.model.Test.findById(id);
    if (!Test) {
      this.ctx.throw(404, 'Test not found');
    }
    return Test.destroy();
  }
}

module.exports = Test;
