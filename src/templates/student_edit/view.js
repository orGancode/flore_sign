require('./view.scss');
const UpdateSign = require('../update_sign/view');
const SideBar = require('../../partials/sidebar/view');


class UpdateStudent extends UpdateSign {

  constructor() {
    super();
    new SideBar();
  }

}

module.exports = UpdateStudent;
