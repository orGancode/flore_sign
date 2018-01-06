class SideBar {
  constructor(prop) {
    this.bindEvents();
  }

  bindEvents() {
    this.initSidebar();
    $('.sidebar li').on('click', e => this.routeOrOpen(e));
  }

  initSidebar() {
    const hash = location.hash ? location.hash.slice(1).split('?')[0] : '';
    if (!hash) return;
    $('.sidebar li').each((index, ele) => {
      const aEle = $(ele).find('a');
      if (hash.indexOf(aEle.data('href')) > -1) {
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
