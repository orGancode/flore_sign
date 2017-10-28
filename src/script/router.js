const login = require('../templates/login/view.hbs');
const welcome = require('../templates/welcome/view.hbs');
const getResource = require('./getResource');
const Cookie = require('./cookie');

const {
  Login,
  Welcome,
} = require('./objects');
// 路由跳转

const renderHtmlJs = (templates, JsObj) => {
  $('#app').html(templates);
  const jsobj = new JsObj({ router });
}

const getUserBaseInfo = () => {
  return {
    isLogin: !!Cookie.get('remember_token'),
    userName: unescape(Cookie.get('username'))
  }
}

const router = (route) => {
  window.location.hash = route;
  getResource(route || 'welcome').then((data, JsObj) => {
    switch (route) {
      case 'login':
        renderHtmlJs(login({ DATA: data }), Login)
        break;
      default:
        renderHtmlJs(welcome({ DATA: data, USER: getUserBaseInfo() }), Welcome)
    }
  })
  .catch((error) => {
    $('#app').html(JSON.stringify(error));
  });
}

module.exports = router;
