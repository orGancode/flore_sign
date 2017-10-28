const Modal = require('../../vender/modal');

class Welcome {
  constructor(prop) {
    this.router = prop.router;
    this.bindEvents();
  }

  bindEvents() {
    $('#app').on('click', '.js-login', e => {
      this.router('login');
    });
    $('.js-logout').on('click', e => this.logout());
    $('.username').on('click', e => {
      const nav = $(e.currentTarget).find('.navs:visible');
      if (nav.length) {
        nav.toggleClass('nav-open')
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

module.exports = Welcome;
