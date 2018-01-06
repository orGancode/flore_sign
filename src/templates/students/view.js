require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');

class Students {
  constructor(prop) {
    new Head();
    new SideBar();
    this.bindEvents();
  }

  bindEvents() {
    $('.js-del-student').on('click', e => this.deleteStudent(e));
  }

  deleteStudent(e) {
    const id = $(e.currentTarget).data('id');
    new Modal({
      content: '是否删除该学员',
      icon: 'warning',
      title: '提示',
      isConfirm: true,
    }).show(() => {
      $('body').spin('small');
      $.ajax({
        url: `/api/course/student/${id}`,
        type: 'DELETE',
        success: (res) => {
          if (res.code === 1) {
            window.location.reload();
          } else {
            new Modal({
              icon: 'failure',
              content: res.msg,
              title: '错误'
            }).show();
          }
        },
        complete: () => $('body').spin(false),
      });
    });
  }

}

module.exports = Students;
