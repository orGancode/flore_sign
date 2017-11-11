const Modal = require('../../vender/modal');
const SignUp = require('../sign_up/view');

class UpdateSign extends SignUp {

  bindEvents() {
    $('.sign-up-form').on('submit', e => this.submitUpdateSign(e));
    $('.js-upload-file').on('click', e => this.triggerFileUpload(e));
    $('input[type="file"]').on('change', e => this.renderFileChange(e));
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
    if (!formdata.get('pay_image')) {
      tipModal('请上传支付截图')
      return false;
    };
    if (!formdata.get('card_image_front')) {
      tipModal('请上传身份证正面照')
      return false;
    };
    if (!formdata.get('card_image_back')) {
      tipModal('请上传身份证背面照')
      return false;
    };
    return true;
  }

  submitUpdateSign(e) {
    e.preventDefault();
    const form = new FormData(document.getElementById('sign-up-form'));
    if (!this.checkFormValid(form)) {
      return;
    }
    if (form.get('card_image_back_file').size) {
      form.set('card_image_back', form.get('card_image_back_file'));
    }
    if (form.get('card_image_front_file').size) {
      form.set('card_image_front', form.get('card_image_front_file'));
    }
    if (form.get('pay_image_file').size) {
      form.set('pay_image', form.get('pay_image_file'));
    }
    form.delete('card_image_back_file');
    form.delete('card_image_front_file');
    form.delete('pay_image_file');
    $.ajax({
      url: '/api/apply/update',
      data: form,
      processData: false,
      contentType: false,
      type: 'PUT',
      success: (res) => {
        if (res.code === 1) {
          new Modal({
            icon: 'success',
            content: '恭喜，修改信息成功！',
            title: '成功'
          }).show(() => {
            window.location.reload();
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

module.exports = UpdateSign;
