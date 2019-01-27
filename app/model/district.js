module.exports = app => {
  const { STRING } = app.Sequelize;

  const District = app.model.define('districts', {
    code: { type: STRING, primaryKey: true },
    name: STRING,
    parentCode: STRING,
  }, {
    timestamps: false, // 去除createAt updateAt
  });

  return District;
};
