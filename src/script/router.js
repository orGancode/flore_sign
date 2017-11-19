const login = require('../templates/login/view.hbs');
const welcome = require('../templates/welcome/view.hbs');
const notfound = require('../templates/notfound/view.hbs');
const userCenter = require('../templates/user_center/view.hbs');
const signUp = require('../templates/sign_up/view.hbs');
const querySign = require('../templates/query_sign/view.hbs');
const updateSign = require('../templates/update_sign/view.hbs');
const users = require('../templates/users/view.hbs');

const getResource = require('./getResource');
const Cookie = require('./cookie');

const {
  Login,
  Welcome,
  SignUp,
  NotFound,
  UserCenter,
  QuerySign,
  UpdateSign,
  Users
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
  const pureRoute = (route || 'welcome').split('?')[0];
  getResource(route).then((data, JsObj) => {
    switch (pureRoute) {
      case 'welcome':
        renderHtmlJs(welcome({ DATA: data, USER: getUserBaseInfo() }), Welcome);
        break;
      case 'login':
        renderHtmlJs(login({ DATA: data }), Login);
        break;
      case 'sign-up':
        renderHtmlJs(signUp({ DATA: data }), SignUp);
        break;
      case 'query':
        renderHtmlJs(querySign({ DATA: data, USER: getUserBaseInfo() }), QuerySign);
        break;
      case 'update-sign':
        renderHtmlJs(updateSign({ SUBJECT: data[0], DATA: data[1], USER: getUserBaseInfo() }), UpdateSign);
        break;
      case 'user-center':
        renderHtmlJs(userCenter({ DATA: data, USER: getUserBaseInfo() }), UserCenter);
        break;
      case 'users':
        renderHtmlJs(users({ DATA: data, USER: getUserBaseInfo() }), Users);
        break;
      default:
        renderHtmlJs(notfound({ USER: getUserBaseInfo() }), NotFound);
    }
  })
  .catch((error) => {
    $('#app').html(JSON.stringify(error));
  });
}

module.exports = router;
