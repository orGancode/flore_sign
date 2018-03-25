require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');

const groupModal = require('./modals/create-group.hbs')

class UserCenter {
  constructor(prop) {
    new Head();
    new SideBar();
    this.bindEvents();
  }

  bindEvents() {
    $('.js-create-group').on('click', (e) => this.showGroupModa(e));
    $('.js-edit-group').on('click', (e) => this.showGroupModa(e));
    $('.js-del-group').on('click', (e) => this.delGroup(e));
  }

  showGroupModa (e) {
    const $self = $(e.currentTarget);
    const data = $self.data('info');
    $('#group-form').off();
    new Modal(groupModal(data)).show();
    $('#group-form').on('submit', (e) => this.submitSaveGroup(e));
  }

  submitSaveGroup (e) {
    e.preventDefault()
    const data = $(e.currentTarget).serializeJson();
    const id = $(e.currentTarget).data('id')
    if (!id) {
      data.menus = []
    }
    $.ajax({
      url: `/api/auth/roles${id ? `/${id}` : ''}`,
      method: id ? 'PUT':'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: (res) => {
        const txt = id ? '编辑' : '创建'
        if (+res.code === 1) {
          new Modal({icon: 'success', title: '恭喜' ,content: `${txt}用户组成功`}).show(() => {
            window.location.reload();
          });
        } else {
          new Modal({icon: 'error', title: '提示' ,content: res.msg || `${txt}用户组失败`}).show();
        }
      }
    })
  }

  delGroup (e) {
    const id = $(e.currentTarget).data('id');
    new Modal({
      icon: 'info',
      title: '删除提示',
      content: '是否该用户组？',
      isConfirm: true,
    }).show(() => {
      $.ajax({
        url: `/api/auth/roles/${id}`,
        type: 'delete',
        success: (res) => {
          if (+res.code === 1) {
            window.location.reload();
          } else {
            new Modal({icon: 'error', title: '提示' ,content: res.msg || `删除用户组失败`}).show();
          }
        }
      })
    })
  }

}

module.exports = UserCenter;
