module.exports = app => {
  const { STRING } = app.Sequelize;

  const City = app.model.define('cities', {
    value: {
      type: STRING,
      primaryKey: true,
      field: 'code',
    },
    label: {
      type: STRING,
      field: 'name',
    },
    parentCode: STRING,
  }, {
    timestamps: false, // 去除createAt updateAt
  });

  City.associate = function() {
    app.model.City.hasMany(app.model.District, {
      foreignKey: 'parentCode', // 目标表中的外键名或相当于定义外键列的对象 (语法参考 Sequelize.define )。使用对象时，应该添加一个name来设置列名。默认的外键命名规为源模型名+源模型主键名
      targetKey: 'code', // 用于关联目标表的字段名。默认为目标表的主键。
      as: 'children', // city别名，需要在include语句里同样申明
    });
  };

  return City;
};
