class SideBar {
  constructor(prop) {
    this.bindEvents();
  }

  bindEvents() {
    this.initSidebar();
    $('.sidebar li').on('click', e => this.routeOrOpen(e));
  }

  initSidebar() {
    const hash = location.hash ? location.hash.slice(1) : '';
    if (!hash) return;
    $('.sidebar li').each((index, ele) => {
      const aEle = $(ele).find('a');
      if (aEle.data('href') === hash) {
        $('.sidebar li').removeClass('active');
        $(ele).addClass('active');
        $(ele).parent().closest('li').addClass('open');
      }
    })
  }

  routeOrOpen(e) {
    const aElems = $(e.currentTarget).find('a');
    if (aElems.length === 1) {
      location.hash = aElems.data('href');
    } else {
      $(e.currentTarget).toggleClass('open');
    }
  }

}

module.exports = SideBar;
