module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const SubMenu = app.model.define('subMenu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    pId: INTEGER,
    name: STRING,
    url: STRING,
    orderId: INTEGER,
  }, {
    timestamps: false,
  });

  return SubMenu;
};
