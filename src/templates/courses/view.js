require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');
const DateSelect = require('../../partials/dateselect/view');
const coursesForm = require('./modals/create_form.hbs');
class Courses {
  constructor(prop) {
    new Head();
    new SideBar();
    this.bindEvents();
  }

  bindEvents() {
    $('.filter-form').on('submit', e => this.submitSearch(e));
    $('.js-reset-search').on('click', () => this.resetSearch());
    $('.js-create-course').on('click', e => this.popCreateForm(e));
    $('.js-edit-course').on('click', e => this.popCreateForm(e));
    $('.js-del-course').on('click', e => this.deleteCourse(e));

  }

  submitSearch(e) {
    e.preventDefault();
    const data = $(e.currentTarget).serializeJson();
    const params = [];
    for(let i in data) {
      params.push(`${i}=${data[i]}`);
    }
    if (params.length) {
      if (location.href.indexOf('?') > -1) {
        location.href = location.href.split('?')[0] + `?${params.join('&')}`;
      } else {
        location.href += `?${params.join('&')}`;
      }
    }
  }

  resetSearch() {
    location.href = location.href.split('?')[0];
    location.reload();
  }

  popCreateForm(e) {
    new Modal(coursesForm({ data: $(e.currentTarget).data('info'), subjects: $('[name="subject_id"]').data('subjects') })).show();
    new DateSelect({ required: true, el: '.js-start-time' });
    new DateSelect({ required: true, el: '.js-end-time' });
    $('.course-form').on('submit', e => this.submitSubject(e));
  }

  triggerFileUpload(e) {
    const $fileInput = $(e.currentTarget).closest('div').find('input[type="file"]');
    $fileInput.trigger('click');
  }

  renderFileChange(e) {
    const filePath = $(e.currentTarget).val();
    const fileExt = filePath.split()
    const imgArr = ['jpg', 'png', 'jpeg', 'gif'];
    if (!/.+(jpg|png|gif|jpeg)$/.test(filePath)) {
      new Modal({
        icon: 'info',
        title: '上传提示',
        content: '请上传扩展名为.jpg、.png、.gif或.jpeg的图片'
      }).show();
      $(e.currentTarget).val('');
      $(e.currentTarget).closest('div').find('.js-upload-file').html('点击上传文件');
      return;
    }
    $(e.currentTarget).closest('div').find('.js-upload-file').html(filePath.split('\\')[filePath.split('\\').length - 1]);
  }

  checkFormValid(formdata) {
    const tipModal = (content) => {
      new Modal({
        icon: 'warning',
        title: '提示',
        content
      }).show();
    }
    if (!formdata.name) {
      tipModal('请填写课程称');
      return false;
    };
    if (Date.parse(formdata.end_time.replace(/-/g, '/')) <= Date.parse(formdata.start_time.replace(/-/g, '/'))) {
      tipModal('结束时间需在开始时间之后');
      return false;
    }
    if (!/^[1-9]\d*$/.test(formdata.period)) {
      tipModal('请填写正确的期数');
      return false;
    };
    return true;
  }

  submitSubject(e) {
    e.preventDefault();
    const id = $(e.currentTarget).data('id');
    const data = $('.course-form').serializeJson();
    const { active, name, period, subject_id } = data;
    const payload = { active, name, period, subject_id };
    payload.active = !!data.active;
    payload.end_time = `${data['e[year]']}-${data['e[month]']}-${data['e[day]']}`;
    payload.start_time = `${data['s[year]']}-${data['s[month]']}-${data['s[day]']}`;

    if (!this.checkFormValid(payload)) {
      return;
    }
    $(e.currentTarget).spin('small');
    $.ajax({
      url: `/api/course/course${id ? `/${id}` : ''}`,
      data: JSON.stringify(payload),
      contentType: 'application/json',
      type: id ? 'PUT' : 'POST',
      success: (res) => {
        $(e.currentTarget).spin(false);
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
      complete: () => $(e.currentTarget).spin(false),
    })
  }

  deleteCourse(e) {
    const id = $(e.currentTarget).data('id');
    new Modal({
      content: '是否删除该课程',
      icon: 'warning',
      title: '提示',
      isConfirm: true,
    }).show(() => {
      $('body').spin('small');
      $.ajax({
        url: `/api/course/course/${id}`,
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

module.exports = Courses;
