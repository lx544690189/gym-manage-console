'use strict';
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class TestController extends Controller {
  async index() {
    const ctx = this.ctx;
    console.log('ctx: ', ctx.model.Test);
    const query = { limit: 10, offset: 0 };
    ctx.body = await ctx.model.Test.findAll(query);
  }

  async get() {
    const { ctx } = this;
    const { query: { id } } = ctx;
    console.log('id: ', id);
    ctx.body = await ctx.model.Test.findByPk(toInt(id));
  }

  async post() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    console.log('id: ', ctx.request.body);
    ctx.body = await ctx.model.Test.findByPk(toInt(id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, age } = ctx.request.body;
    const Test = await ctx.model.Test.create({ name, age });
    ctx.status = 201;
    ctx.body = Test;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Test = await ctx.model.Test.findById(id);
    if (!Test) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await Test.update({ name, age });
    ctx.body = Test;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const Test = await ctx.model.Test.findById(id);
    if (!Test) {
      ctx.status = 404;
      return;
    }

    await Test.destroy();
    ctx.status = 200;
  }
}

module.exports = TestController;
