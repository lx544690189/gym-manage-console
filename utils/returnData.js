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

module.exports = { success, error };
