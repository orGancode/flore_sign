const Modal = require('./modal');
// const loginModalTemplate = require('../templates/login_modal/view.hbs');

const ajaxModal = (title, content) => new Modal({
  icon: 'failure',
  title: `错误---${title}`,
  content: content,
}).show();

// const loginModal = () => new Modal(loginModalTemplate()).show();

$.ajaxSetup({
  cache: false,
  contentType: 'application/json',
  error: (jqXHR, textStatus, errorThrown) => {
    switch (jqXHR.status) {
      case 404:
        ajaxModal('404', '接口未找到！');
        break;
      case 500:
        ajaxModal('500', `系统异常！${errorThrown}`);
        break;
      default:
        ajaxModal('error', '请求失败！');
    }
  },
  beforeSend: (xhr) => {
  },
  complete: (xhr, status) => {
  }
})
