class Welcome {
  constructor(prop) {
    this.router = prop.router;
    this.bindEvents();
  }

  bindEvents() {
    $('#app').on('click', '.js-login', e => {
      this.router('login');
    });
  }
}

module.exports = Welcome;
