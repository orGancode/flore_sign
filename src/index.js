import './style.scss';
import './vender/ajax';
import './vender/formSerialize';

const router = require('./script/router');
const checkHash = require('./script/checkHash');

// 增加hash变化监听事件
checkHash();
// 初始页面渲染
router(window.location.hash.slice(1));
