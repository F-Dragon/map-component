import axios from 'axios';
// 添加一个响应拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers = {
    "Content-Type": "application/json",
    "uc_access_token": localStorage.getItem('token'),

    ...config.headers
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

function getQueryStringhash(key) {
  let after = window.location.search;
  if (after.indexOf('?') === -1) return null; //如果url中没有传参直接返回空
  //key存在先通过search取值如果取不到就通过hash来取
  after = after.substr(1) || window.location.hash.split("?")[1];
  if (after) {
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    let r = after.match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    else {
      return null;
    }
  }
}
export default axios;