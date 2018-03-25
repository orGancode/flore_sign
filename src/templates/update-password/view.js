require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');

class UserCenter {
  constructor(prop) {
    new Head()
    new SideBar();
    this.bindEvents();
  }

  bindEvents() {
    $('#pwd-update-form').on('submit', e => this.checkPassword(e));
  }

  checkPassword (e) {
    e.preventDefault();
    const data = $(e.currentTarget).serializeJson();
    const { oldp, newp, confirmp } = data
    if (!oldp || !newp || !confirmp) {
      new Modal({
        icon: 'warning',
        title: '校验提示',
        content: '请完善输入',
      }).show();
      return
    }
    if (newp !== confirmp) {
      new Modal({
        icon: 'warning',
        title: '校验提示',
        content: '两次输入的密码不一致，请核对后重试',
      }).show();
      return
    }
    this.submitUpdate(data)
  }

  submitUpdate (data) {
    $.ajax({
      url: '/api/auth/password',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ new_password: data.newp, old_password: data.oldp }),
      success: (res) => {
        if (+res.code === 1) {
          new Modal({icon: 'success', title: '恭喜' ,content: '修改密码成功'}).show(() => {
            window.location.reload();
          });
        } else {
          new Modal({icon: 'error', title: '提示' ,content: res.msg || '密码修改失败'}).show();
        }
      },
    })
  }

}

module.exports = UserCenter;
