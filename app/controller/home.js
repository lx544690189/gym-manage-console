'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    console.log('home');
    this.ctx.body = 'hi, egg';
  }

  async testLogin() {
    console.log('testLogin');
    this.ctx.body = 'hi, testLogin';
  }
}

module.exports = HomeController;
