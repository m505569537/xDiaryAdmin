import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

axios.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
}, err => {
    return Promise.reject(err)
})
// 注册
export const getRegister = (params) => axios.post('/register', params);

// 登录
export const getLogin = (params) => axios.post('/login', params);

// 获取用户信息
export const getUser = (params) => axios.get('/getUser', { params });

// 获取文章类型
export const getLabels = () => axios.get('/labels');

// 上传文章
export const sendArticles = (params, config) => axios.post('/sendarticles', params, config);

// 上传图片
export const sendImages = (params, config) => axios.post('/sendimages', params, config);

// 获取用户发布的信息
export const getUserPublish = (params) => axios.get('/getUserPublish', { params });