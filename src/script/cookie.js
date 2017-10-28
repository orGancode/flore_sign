const Cookie = {
  set: (objName, objValue, objDays, objDomain) => {
    let str = objName + "=" + escape(objValue);
    str += ";path=/;domain=" + objDomain;
    if (objDays > 0) {
      const date = new Date();
      const ms = objDays * 3600 * 1000 * 24;
      date.setTime(date.getTime() + ms);
      str += ";expires=" + date.toGMTString();
    }
    document.cookie = str;
  },
  get: (cookieName) => {
    const cookies = document.cookie.split(';');
    let value = '';
    cookies.forEach((v) => {
      const temp = v.split('=');
      if (temp[0].trim() === cookieName) {
        value = temp[1];
      }
    });
    return value;
  },
  delete: (objName, objDomain) => {
    document.cookie = objName + "=;path=/;domain=" + objDomain + ";expires=" + (new Date(0)).toGMTString()
  },
}

module.exports = Cookie;
