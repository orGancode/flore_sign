require('./view.scss');

class DateSelect {
  constructor(prop) {
    this.el = prop.el;
    this.beginYear = prop.beginYear || 2000;
    this.yearRange = prop.range || 30;
    this.bindEvents();
    this.initDateSelect(prop);
  }

  bindEvents() {
    $(this.el).find('.year').on('change', () => this.renderDaySelect());
    $(this.el).find('.month').on('change', () => this.renderDaySelect());
  }

  initDateSelect(prop) {
    if (prop.required) {
      $(this.el).find('select').attr('required', 'required');
    }
    const defaultValue = $(this.el).data('default');
    if (defaultValue) {
      const date = new Date(defaultValue.replace(/-/g, '/'));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      this.renderYear(this.beginYear, this.yearRange, year);
      this.renderMonth(month);
      this.renderDay(year, month, day);
    } else {
      const nowTime = new Date();
      const nowYear = nowTime.getFullYear();
      const nowMonth = nowTime.getMonth() + 1;
      const nowDay = nowTime.getDate();
      this.renderYear(this.beginYear, this.yearRange, nowYear);
      this.renderMonth(nowMonth);
      this.renderDay(nowYear, nowMonth, nowDay);
    }
  }

  renderDaySelect() {
    const year = +$(this.el).find('.year').val();
    const month = +$(this.el).find('.month').val();
    this.renderDay(year, month);
  }

  renderYear(startYear, range, selectYear) {
    const yearOptions = [];
    for (let i = 0; i < range; i++) {
      const year = startYear + i;
      yearOptions.push(`<option value="${year}" ${year === selectYear ? 'selected' : ''}>${year}</option>`);
    }
    $(this.el).find('.year').html(yearOptions);
  }

  renderMonth(selectMonth) {
    const monthOptions = [];
    for (let i = 1; i < 13; i++) {
      monthOptions.push(`<option value="${i}" ${i === selectMonth ? 'selected' : ''}>${i}</option>`);
    }
    $(this.el).find('.month').html(monthOptions);
  }

  renderDay(year, month, selectDay) {
    let days = 0;
    if (year && month) {
      if ([1,3,5,7,8,10,12].indexOf(month) > -1) {
        days = 31;
      } else if (month === 2) {
        if ((!(year % 4) && year % 100) || !(year % 400)) {
          days = 29;
        } else {
          days = 28;
        }
      } else {
        days = 30;
      }
    } else {
      return;
    }
    $(this.el).find('.day').val('');
    $(this.el).find('.day').empty();
    const dayOptions = [];
    for (let i = 0; i < days; i++) {
      const day = i + 1;
      dayOptions.push(`<option value="${day}" ${day === selectDay ? 'selected' :''}>${day}</option>`);
    }
    $(this.el).find('.day').html(dayOptions);
  }
}

module.exports = DateSelect;
