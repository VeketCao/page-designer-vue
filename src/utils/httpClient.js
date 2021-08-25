import request from 'superagent';

const PRO_SERVER =  process.env.API_ROOT;

/**
 * url处理
 * @param path
 * @returns {string|*}
 */
const getUrl =  path => {
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  return `${PRO_SERVER}${path}`;
}

/**
 * 统一错误处理
 * @param err
 * @param path
 */
const errorHandler = (err,path) => {
  console.log('接口:',getUrl(path));
  console.log('报错:',err.toString());
};

/**超时**/
const time_out = {
  response: 10000,  // Wait 10 seconds for the server to start sending,
  deadline: 60000, // but allow 1 minute for the file to finish loading.
}

/**
 * 统一处理参数
 * @param query
 * @returns {{data: string}}
 */
const buildQuery = (query)=>{
  if(_.isEmpty(query)) return query;
  let p = {data:encodeURI(JSON.stringify(query))}
  return p
}

let httpClient={PRO_SERVER:PRO_SERVER};


/**
 * get
 * @param path
 * @param query
 * @param token
 * @returns {Promise<unknown>}
 */
httpClient.get = function(path, query, token){
  return new Promise((resolve, reject) => {
     request
      .get(getUrl(path))
      .timeout(time_out)
      .withCredentials()
      .set('Content-Type', 'application/json')
      .set('x-auth-token', token)
      .query(buildQuery(query))
      .end((err, res) => {
        if (err) {
          errorHandler(err,path);
          reject(err);
        } else {
          if (res.body.code == AppUtil.UN_LOGIN_CODE) {
            localStorage.setItem('history_url',window.location.href)
            window.location.href = process.env.SSO + '/logout?service=' + process.env.LOGIN_HOME;
          }
          resolve(res.body);
        }
      });
  });
};

/**
 * 登陆
 * @param path
 * @param formdata
 * @param query
 * @returns {Promise<unknown>}
 */
httpClient.login = function(path, formdata, query){
  return new Promise((resolve, reject) => {
    request
      .post(getUrl(path))
      .timeout(time_out)
      .withCredentials()
      .set('Content-Type', 'application/json')
      .query(buildQuery(query))
      .send(formdata)
      .end((err, res) => {
        if (err) {
          errorHandler(err,path);
          reject(err);
        } else {
          if (res.header['x-auth-token'] && path.indexOf('/login') > -1) {
            window.sessionStorage.setItem(
              'access_token',
              res.header['x-auth-token']
            );
          }
          resolve(res.body);
        }
      });
  })
};

/**
 * post
 * @param path
 * @param formdata
 * @param query
 * @returns {Promise<unknown>}
 */
httpClient.post = function(path, formdata, query){
  return new Promise((resolve, reject) => {
    request
      .post(getUrl(path))
      .timeout(time_out)
      .withCredentials()
      .set('Content-Type', 'application/json')
      // .set('x-auth-token', token)
      .query(buildQuery(query))
      .send(formdata)
      .end((err, res) => {
        if (err) {
          errorHandler(err,path);
          reject(err);
        } else {
          if (res.body && res.body.code == AppUtil.UN_LOGIN_CODE) {
            localStorage.setItem('history_url',window.location.href)
            window.location.href = process.env.SSO + '/logout?service=' + process.env.LOGIN_HOME;
          }
          resolve(res.body);
        }
      });
  })
};

/**
 * put
 * @param path
 * @param query
 * @param payload
 * @returns {Promise<unknown>}
 */
httpClient.put = function(path, query, payload){
  return new Promise((resolve, reject) => {
    request
      .put(getUrl(path))
      .timeout(time_out)
      .query(buildQuery(query))
      .send(payload)
      .end((err, res) => {
        if (err) {
          errorHandler(err,path);
          reject(err);
        } else {
          resolve(res);
        }
      });
  })
};

/**
 * delete
 * @param path
 * @param query
 * @returns {Promise<unknown>}
 */
httpClient.delete = function(path, query){
  return new Promise((resolve, reject) => {
    request
      .del(getUrl(path))
      .timeout(time_out)
      .withCredentials()
      .query(buildQuery(query))
      .end((err, res) => {
        if (err) {
          errorHandler(err,path);
          reject(err);
        } else {
          resolve(res);
        }
      });
  })
};

export default httpClient
