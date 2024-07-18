

const TOKENKEY = 'persist:root'

function setToken (token) {
  return localStorage.setItem(TOKENKEY, token)
}

function getToken () {
  let data = localStorage.getItem(TOKENKEY);
  // console.log("获取到localStorage的数据",data);
  if(data){
    let state = JSON.parse(data);
    let user = JSON.parse(state.user);
    // console.log(state, user);
    return user.token; 
  }
  return ''
}

function removeToken () {
  return localStorage.removeItem(TOKENKEY);
}

export {
  setToken,
  getToken,
  removeToken
}