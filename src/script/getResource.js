const resource = require('../resources/config');
const Promise = require("bluebird");

const getUrlQuery = (configQuery) => {
  const params = location.href.split('?')[1];
  const paramsArr = [];
  if (params) {
    params.split('&').forEach((param) => {
      if (configQuery.indexOf(param.split('=')[0]) > -1) {
        paramsArr.push(param);
      }
    });
  }

  return paramsArr.join('&');
};

const fetchApi = (config, res, rej) => {
  const url = config.url;
  const paramsString = config.query ? getUrlQuery(config.query) : '';
  $.ajax({
    url: `${url}${paramsString ? `?${paramsString}` : ''}`,
    type: config.type || 'get',
    cache: !!config.cache,
    success: (data) => {
      res(data);
    }
  })
};

module.exports = (route) => {
  return new Promise((resolve, reject) => {
    // 通过剔除参数的哈希，获取页面的url配置
    const pureRoute = (route || 'welcome').split('?')[0];
    const config = resource[pureRoute];
    // 判断是否有服务
    if (config) {
      // 判断是否是只有一个服务
      if (typeof config.url === 'string') {
        new Promise((res, rej) => fetchApi(config, res, rej)).then((data) => resolve(data));
      } else if (config.url instanceof Array) {
        const fetchPromises = []
        config.url.forEach((subConfig) => {
          fetchPromises.push(new Promise((res, rej) => fetchApi(subConfig, res, rej)));
        });
        Promise.all(fetchPromises).then((data) => resolve(data));
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}
