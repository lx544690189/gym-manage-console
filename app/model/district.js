module.exports = app => {
  const { STRING } = app.Sequelize;

  const District = app.model.define('districts', {
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

  return District;
};
