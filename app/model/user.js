module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('name', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
  }, { freezeTableName: true });

  return User;
};
