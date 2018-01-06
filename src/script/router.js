const login = require('../templates/login/view.hbs');
const welcome = require('../templates/welcome/view.hbs');
const notfound = require('../templates/notfound/view.hbs');
const userCenter = require('../templates/user_center/view.hbs');
const signUp = require('../templates/sign_up/view.hbs');
const querySign = require('../templates/query_sign/view.hbs');
const updateSign = require('../templates/update_sign/view.hbs');
const subjects = require('../templates/subjects/view.hbs');
const users = require('../templates/users/view.hbs');
const courses = require('../templates/courses/view.hbs');
const students = require('../templates/students/view.hbs');
const student_edit = require('../templates/student_edit/view.hbs');

const getResource = require('./getResource');
const Cookie = require('./cookie');

const PagesObject = require('./objects');
// 路由跳转

const renderHtmlJs = (templates, data, JsObj) => {
  data.href = location.href;
  const urlParams = getUrlParams();
  for (let i in urlParams) {
    if (urlParams[i]) {
      data[i] = urlParams[i];
    }
  }
  $('#app').html(templates(data));
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

const getUrlParams = () => {
  const params = location.href.split('?')[1];
  const paramsObj = {};
  if (params) {
    params.split('&').forEach((param) => {
      paramsObj[param.split('=')[0]] = param.split('=')[1];
    });
  }

  return paramsObj;
};

const router = (route) => {
  window.location.hash = route;
  const pureRoute = (route || 'welcome').split('?')[0];
  getResource(route).then((data, JsObj) => {
    switch (pureRoute) {
      case 'welcome':
        renderHtmlJs(welcome, { DATA: data, USER: getUserBaseInfo() }, PagesObject.Welcome);
        break;
      case 'login':
        renderHtmlJs(login, { DATA: data }, PagesObject.Login);
        break;
      case 'sign-up':
        renderHtmlJs(signUp, { DATA: data }, PagesObject.SignUp);
        break;
      case 'query':
        renderHtmlJs(querySign, { DATA: data, USER: getUserBaseInfo() }, PagesObject.QuerySign);
        break;
      case 'update-sign':
        renderHtmlJs(updateSign, { SUBJECT: data[0], DATA: data[1], USER: getUserBaseInfo() }, PagesObject.UpdateSign);
        break;
      case 'user-center':
        renderHtmlJs(userCenter, { DATA: data, USER: getUserBaseInfo() }, PagesObject.UserCenter);
        break;
      case 'subjects':
        renderHtmlJs(subjects, { DATA: data, USER: getUserBaseInfo() }, PagesObject.Subjects);
        break;
      case 'courses':
        renderHtmlJs(courses, { DATA: data[0], SUBJECT: data[1], USER: getUserBaseInfo() }, PagesObject.Courses);
        break;
      case 'users':
        renderHtmlJs(users, { DATA: data, USER: getUserBaseInfo() }, PagesObject.Users);
        break;
      case 'students':
        renderHtmlJs(students, { DATA: data, USER: getUserBaseInfo() }, PagesObject.Students);
        break;
      case 'students-edit':
        renderHtmlJs(student_edit, { SUBJECT: data[0], DATA: data[1], USER: getUserBaseInfo() }, PagesObject.StudentEdit);
        break;
      default:
        renderHtmlJs(notfound, { USER: getUserBaseInfo() }, PagesObject.NotFound);
    }
  })
  .catch((error) => {
    $('#app').html(JSON.stringify(error));
  });
}

module.exports = router;
