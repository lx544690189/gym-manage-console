module.exports = app => {
  const { STRING } = app.Sequelize;

  const City = app.model.define('cities', {
    code: { type: STRING, primaryKey: true },
    name: STRING,
    parentCode: STRING,
  }, {
    timestamps: false, // 去除createAt updateAt
  });

  City.associate = function() {
    app.model.City.hasMany(app.model.District, {
      foreignKey: 'parentCode',
      targetKey: 'code',
    });
  };

  return City;
};
