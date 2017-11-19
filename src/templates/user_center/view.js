require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');

class UserCenter {
  constructor(prop) {
    new Head();
    new SideBar();
    this.bindEvents();
  }

  bindEvents() {

  }

}

module.exports = UserCenter;
