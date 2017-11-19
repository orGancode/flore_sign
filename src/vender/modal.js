class Modal {
  constructor(props) {
    this.modalType = typeof props === 'string' ? 'contentModal' : 'tipModal';
    if (typeof props === 'string') {
      this.modal = props;
    } else {
      this.icon = props.icon || 'info';
      this.title = props.title || '提示';
      this.content = props.content || '提示内容';
      this.isConfirm = !!props.isConfirm;
    }
  }

  show(confirmCallback, cancelCallback) {
    if (this.modalType === 'tipModal') {
      this.renderModal();
      $('body').append($(this.modal));
      setTimeout(() => {
        // 绑定事件
        $('.js-confirm').on('click', e => {
          confirmCallback && confirmCallback();
          this.close(e);
        });
        $('.js-close').on('click', e => {
          cancelCallback && cancelCallback();
          this.close(e);
        });
      }, 0);
    } else {
      $('body').append(`<div class='modal-layer'>${this.modal}</div>`);
      $('body').on('click', '.js-close', (e) => this.close(e));
    }
  }

  close(e) {
    if (e) {
      $(e.currentTarget).closest('.modal-layer').remove();
    } else {
      $('#loading-modal').remove();
    }
  }

  renderModal() {
    this.modal = `
      <div class='modal-layer'>
        <div class='modal'>
          <div class="modal-head">
            <h3><i class='iconflore icon-${this.icon}'></i>${this.title}</h3>
          </div>
          <div class="modal-body">${this.content ? `<p>${this.content}</p>` : ''}</div>
          <div class="modal-foot">
            ${this.isConfirm ? `<button class='btn js-close'>取消</button>` : ''}
            <button class='btn btn-primary js-confirm'>确认</button>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = Modal
