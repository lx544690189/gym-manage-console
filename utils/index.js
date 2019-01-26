const Op = require('Sequelize').Op;

/**
 * 返回成功数据
 */
function success({ message, data } = { message: '', data: null }) {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * 返回失败数据
 */
function error({ message = '请求失败', data = null }) {
  return {
    success: false,
    message,
    data,
  };
}

/**
 * 便捷生成where查询语句
 * @param {object}
 * 如：`{userName:'admin'}`
 */
function getWhereSql(params) {
  const where = {};
  Object.keys(params).forEach(key => {
    if (params[key]) {
      where[key] = {
        [Op.like]: `%${params[key]}%`,
      };
    }
  });
  return where;
}

/**
 * 映射对象值
 * @param {*} keys 对象
 * @param {*} params 需映射的值
 * @param {*} filterEmpty 空值是否映射，默认否
 */
function mapValue(keys, params, filterEmpty = true) {
  const entity = {};
  keys.forEach(key => {
    if (filterEmpty) {
      if (params[key]) {
        entity[key] = params[key];
      }
    } else {
      entity[key] = params[key];
    }
  });
  return entity;
}

module.exports = { success, error, getWhereSql, mapValue };
