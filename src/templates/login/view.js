const Cookie = require('../../script/cookie')
class Login {
  constructor(prop) {
    this.router = prop.router;
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
          alert(res.msg);
        }
      },
    })
  }
}

module.exports = Login;
