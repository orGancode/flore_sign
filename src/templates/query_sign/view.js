const Head = require('../head/view');
const Modal = require('../../vender/modal');

class QuerySign {
  constructor(prop) {
    new Head();
    this.bindEvents();
  }

  bindEvents() {
    $('.query-sign-form').on('submit', e => this.submitQuery(e));
  }

  submitQuery(e) {
    e.preventDefault();
    const data = $(e.currentTarget).serializeJson();
    const params = [];
    for (let i in data) {
      if (data[i]) {
        params.push(`${i}=${data[i]}`);
      }
    }
    if (params.length) {
      $.ajax({
        url: `/api/apply/query?${params.join('&')}`,
        success: (res) => {
          if (res.code === 1) {
            new Modal({ icon: 'success', content: `学员信息：<br>姓名：${res.data.name}<br>课程：${res.data.course_name}<br>是否前往查看详情?`, title: '恭喜，查询成功', isConfirm: true }).show(() => {
              location.hash = `update-sign?id=${res.data.id}`;
            });
          } else {
            new Modal({ icon: 'failure', content: res.msg, title: '错误' }).show();
          }
        },
      })
    } else {
      new Modal({ icon: 'info', title: '抱歉', content: '请至少填写一个筛选条件' }).show();
    }
  }

}

module.exports = QuerySign;
