module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Accounts = app.model.define('accounts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    password: STRING,
  });

  return Accounts;
};
