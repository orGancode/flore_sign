const Modal = require('../../vender/modal');

class Head {
  constructor(prop) {
    this.bindEvents();
  }

  bindEvents() {
    $('.js-logout').on('click', e => this.logout());
    $('.nav-head').on('click', e => {
      const nav = $(e.currentTarget).find('.navs:visible');
      if (nav.length) {
        if (nav.height()) {
          nav.css("height", '0');
        } else {
          nav.css("height", `${nav.find('.nav').length * 1.5}rem`);
        }
      }
    });
  }

  logout() {
    new Modal({
      icon: 'info',
      title: '登出提示',
      content: '是否退出当前用户？',
      isConfirm: true,
    }).show(() => {
      $.ajax({
        url: '/api/auth/logout',
        success: () => {
          window.location.reload();
        },
      })
    })
  }
}

module.exports = Head;
