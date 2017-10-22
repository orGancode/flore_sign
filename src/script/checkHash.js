const hashChangeFire = require('./router');

module.exports = () => {
  // hash路由检测
  if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
    // 浏览器支持onhashchange事件
    window.onhashchange = () => hashChangeFire(location.hash.slice(1));  // TODO，对应新的hash执行的操作函数
  } else {
    // 不支持则用定时器检测的办法
    let oldhash = window.location.hash;
    let newhash = window.location.hash;
    setInterval(() => {
      newhash = window.location.hash;
      // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
　　　 var ischanged = newhash !== oldhash;
      if(ischanged) {
        hashChangeFire(newhash.slice(1));  // TODO，对应新的hash执行的操作函数
        oldhash = newhash;
      }
    }, 150);
  }
}
