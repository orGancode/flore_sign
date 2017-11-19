const Cookie = require('../../script/cookie');
const Head = require('../../partials/head/view');

class Login {
  constructor(prop) {
    new Head();
    this.bindEvents();
  }

  bindEvents() {
    $('.login-form').on('submit', e => this.submitLogin(e));
  }

  submitLogin(e) {
    e.preventDefault();
    const data = $(e.currentTarget).serializeJson();
    $.ajax({
      url: '/api/auth/login',
      data: JSON.stringify(data),
      type: 'POST',
      success: (res) => {
        if (res.code === 1) {
          Cookie.set('username', res.user_name, 30, document.domain);
          window.location.hash = 'user-center';
        } else {
          new Modal({ icon: 'failure', content: res.msg, title: '!oops' }).show();
        }
      },
    })
  }
}

module.exports = Login;
