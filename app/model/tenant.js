const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Tenant = app.model.define('tenant', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    tenantName: STRING,
    tenantPhone: STRING,
    userName: STRING,
    userMobile: STRING,
    province: STRING,
    provinceCode: STRING,
    cityName: STRING,
    cityCode: STRING,
    district: STRING,
    districtCode: STRING,
    address: STRING,
    status: INTEGER,
    created_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    updated_at: {
      type: DATE,
      get() {
        return moment(this.getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  }, {
    // timestamps: false, // 去除createAt updateAt
    // freezeTableName: true, // 默认是false，sequelize默认会在表名后加上s
  });

  return Tenant;
};
