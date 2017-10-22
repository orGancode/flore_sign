
class Login {
  constructor(prop) {
    this.router = prop.router;
    this.bindEvents();
  }

  bindEvents() {
    $('.back').on('click', e => {
      this.router('');
    });
  }
}

module.exports = Login;
