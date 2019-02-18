const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Lecture = app.model.define('lecture', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    picture: STRING,
    maxNum: INTEGER,
    description: STRING,
    status: INTEGER,
    startTime: {
      type: DATE,
      get() {
        return moment(this.getDataValue('startTime')).format('YYYY-MM-DD HH:mm');
      },
    },
    endTime: {
      type: DATE,
      get() {
        return moment(this.getDataValue('endTime')).format('YYYY-MM-DD HH:mm');
      },
    },
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
  });

  return Lecture;
};
