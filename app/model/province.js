module.exports = app => {
  const { STRING } = app.Sequelize;

  const Province = app.model.define('province', {
    code: { type: STRING, primaryKey: true },
    name: STRING,
  }, {
    timestamps: false, // 去除createAt updateAt
  });

  Province.associate = function() {
    app.model.Province.hasMany(app.model.City, {
      foreignKey: 'parentCode',
      targetKey: 'code',
    });
  };

  return Province;
};
