const Modal = require('../../vender/modal');
const Head = require('../../partials/head/view');

class SignUp {
  constructor(prop) {
    new Head()
    this.bindEvents();
  }

  bindEvents() {
    $('.sign-up-form').on('submit', e => this.submitSignUp(e));
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
      tipModal('请填写姓名')
      return false;
    };
    if (!formdata.get('phone') || !/^1(3|4|5|7|8)\d{9}$/.test(formdata.get('phone'))) {
      tipModal('请检查电话号码是否正确填写')
      return false;
    };
    if (!formdata.get('wx')) {
      tipModal('请填写微信号')
      return false;
    };
    if (!formdata.get('pay_image').size) {
      tipModal('请上传支付截图')
      return false;
    };
    if (!formdata.get('card_image_front').size) {
      tipModal('请上传身份证正面照')
      return false;
    };
    if (!formdata.get('card_image_back').size) {
      tipModal('请上传身份证背面照')
      return false;
    };
    return true;
  }

  submitSignUp(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById('sign-up-form'));
    if (!this.checkFormValid(form)) {
      return;
    }
    $.ajax({
      url: '/api/apply',
      data: form,
      processData: false,
      contentType: false,
      type: 'POST',
      success: (res) => {
        if (res.code === 1) {
          new Modal({
            icon: 'success',
            content: '恭喜，提交成功！',
            title: '成功'
          }).show(() => {
            window.location.href = '/';
          });
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

module.exports = SignUp;
