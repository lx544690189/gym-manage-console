module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Test = app.model.define('tests', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
  });

  return Test;
};
