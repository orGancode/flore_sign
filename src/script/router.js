const login = require('../templates/login/view.hbs');
const welcome = require('../templates/welcome/view.hbs');
const notfound = require('../templates/notfound/view.hbs');
const userCenter = require('../templates/user_center/view.hbs');
const signUp = require('../templates/sign_up/view.hbs');

const getResource = require('./getResource');
const Cookie = require('./cookie');

const {
  Login,
  Welcome,
  SignUp,
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
    switch (route || 'welcome') {
      case 'login':
        renderHtmlJs(login({ DATA: data }), Login);
        break;
      case 'sign-up':
        renderHtmlJs(signUp({ DATA: data }), SignUp);
        break;
      case 'welcome':
        renderHtmlJs(welcome({ DATA: data, USER: getUserBaseInfo() }), Welcome);
        break;
      case 'user-center':
        renderHtmlJs(userCenter({ DATA: data, USER: getUserBaseInfo() }));
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
