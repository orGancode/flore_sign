const login = require('../templates/login/view.hbs');
const welcome = require('../templates/welcome/view.hbs');
const notfound = require('../templates/notfound/view.hbs');

const getResource = require('./getResource');
const Cookie = require('./cookie');

const {
  Login,
  Welcome,
} = require('./objects');
// 路由跳转

const renderHtmlJs = (templates, JsObj) => {
  $('#app').html(templates);
  if (JsObj) {
    const jsobj = new JsObj({ router });
  }
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
        renderHtmlJs(notfund({ DATA: data, USER: getUserBaseInfo() }), Welcome);
        break;
      case 'welcome':
        renderHtmlJs(login({ DATA: data }), Login);
        break;
      default:
        renderHtmlJs(notfound());
    }
  })
  .catch((error) => {
    $('#app').html(JSON.stringify(error));
  });
}

module.exports = router;
