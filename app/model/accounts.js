module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Accounts = app.model.define('accounts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    password: STRING,
    name: STRING,
    age: INTEGER,
    sex: STRING,
    birthday: DATE,
    mobile: STRING,
    address: STRING,
  });

  return Accounts;
};
