require('./view.scss');
const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');
const SideBar = require('../../partials/sidebar/view');
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
  }

  submitSearch(e) {
    e.preventDefault();
    const data = $(e.currentTarget).serializeJson();
    const params = [];
    for(let i in data) {
      if (data[i]) {
        params.push(`${i}=${data[i]}`);
      }
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
    new Modal(subjectForm({ data: $(e.currentTarget).data('info') })).show();
    $('.subject-form').on('submit', e => this.submitSubject(e));
    $('.js-upload-file').on('click', e => this.triggerFileUpload(e));
    $('input[type="file"]').on('change', e => this.renderFileChange(e));
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
    if (!formdata.get('name')) {
      tipModal('请填写课程称');
      return false;
    };
    if (!formdata.get('subject_image').size && !formdata.get('subject_image_file')) {
      tipModal('请上传课程图片');
      return false;
    };
    return true;
  }

  submitSubject(e) {
    e.preventDefault();
    const id = $(e.currentTarget).data('id');
    const form = new FormData(document.getElementById('subject-form'));
    if (!this.checkFormValid(form)) {
      return;
    }
    $(e.currentTarget).spin('small');
    if (id && form.get('subject_image_file').size) {
      form.set('subject_image', form.get('subject_image_file'));
    }
    form.delete('subject_image_file');
    $.ajax({
      url: `/api/course/subject${id ? `/${id}` : ''}`,
      data: form,
      processData: false,
      contentType: false,
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

  deleteSubject(e) {
    const id = $(e.currentTarget).data('id');
    $('body').spin('small');
    $.ajax({
      url: `/api/course/subject/${id}`,
      type: 'DELETE',
      success: (res) => {
        $('body').spin(false);
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
    })
  }

}

module.exports = Courses;
