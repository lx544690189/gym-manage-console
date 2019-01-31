module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Menu = app.model.define('menu', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    orderId: INTEGER,
  }, {
    timestamps: false,
  });

  Menu.associate = function() {
    app.model.Menu.hasMany(app.model.SubMenu, {
      foreignKey: 'pId',
      targetKey: 'id',
      as: 'children',
    });
  };

  return Menu;
};
