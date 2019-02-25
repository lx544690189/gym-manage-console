module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Role = app.model.define('roles', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    code: INTEGER,
  }, {
    timestamps: false,
  });

  return Role;
};
