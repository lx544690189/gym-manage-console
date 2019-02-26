const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Accounts = app.model.define('accounts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    password: STRING,
    roleCode: INTEGER,
    userImg: STRING,
    name: STRING,
    age: INTEGER,
    sex: STRING,
    birthday: {
      type: DATE,
      get() {
        return moment(this.getDataValue('birthday')).format('YYYY-MM-DD');
      },
    },
    mobile: STRING,
    address: STRING,
    status: INTEGER,
    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  });

  return Accounts;
};
