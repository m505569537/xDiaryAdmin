const router = require('koa-router')();
const path = require('path');
const { ArticleModel, UserModel, ImageModel } = require('../db/models')
const moment = require('moment');
const multer = require('koa-multer');

const filter = { __v: 0, psd: 0 };

const labels = ['前端', '后端', '产品'];
router.get('/labels', (ctx, next) => {
    ctx.body = { errcode: 0, data: labels }
});

//后台管理api
// 发布文章
// 配置
let img_time = 0;
let img_url = [];
let storage = multer.diskStorage({
    // 文件保存路径
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/images'));
    },
    // 修改文件名称
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split('.');
        img_time = Date.now();
        img_url.push('//localhost:4000/images/' + img_time + '.' + fileFormat[fileFormat.length - 1]);
        cb(null, img_time + '.' + fileFormat[fileFormat.length - 1]);
    }
})
// 加载配置
let upload = multer({ storage });
// router.post('/sendarticles', upload.single('img') ,async (ctx, next) => {
router.post('/sendarticles' ,async (ctx, next) => {
    const { title, type, content, user_id } = ctx.request.body;
    // const article = new ArticleModel({ title, content, type, _id, publish_date: moment().format('YYYY-MM-DD HH:mm:ss'), img_url });
    const article = new ArticleModel({ title, content, type, user_id, publish_date: moment().format('YYYY-MM-DD HH:mm:ss') });
    let errcode = 0, message = '';
    try {
        await article.save()
        errcode = 0;
        message = '发布成功';
    } catch (err) {
        errcode = 1;
        message = '发布失败';
    }

    ctx.body = { errcode, message };
})

// 发布图片
router.post('/sendimages', upload.array('img'), async (ctx, next) => {
    const { user_id } = ctx.req.body;
    let errcode = 1, message = '发布失败', data = [];
    const image = new ImageModel({ user_id,img_url });
    try {
        await image.save();
        errcode = 0;
        message = '发布成功';
        data = img_url;
        img_url = [];
        ctx.body = { errcode, message, data };
    } catch (err) {
        ctx.body = { errcode, message };
    }
    
});



// 用户注册
router.post('/register', async (ctx, next) => {
    const { email, uid, psd } = ctx.request.body;
    let errcode = 1, message = '注册失败';
    // 请求数据库信息 await
    const user = await UserModel.findOne({ $or: [{ email }, { uid }] });
    if(user) {
        message = '用户已存在';
    } else {
        const newUser = new UserModel({ email, uid, psd });
        try {
            // 操作数据库 await
            await newUser.save();
            errcode = 0;
            message = '注册成功';
            ctx.cookies.set('token', newUser._id, {
                maxAge: 1000*60*60*24*7,
                httpOnly: false,
            });
        }catch(err) {
            message = '注册失败';
        }
    }
    ctx.body = { errcode, message };
})

// 用户登录
router.post('/login', async (ctx, next) => {
    const { email, psd } = ctx.request.body;
    let errcode = 1, message = '用户不存在';
    const user = await UserModel.findOne({ email });
    if(user) {
        if(user.psd == psd) {
            errcode = 0;
            message = '登录成功';
            ctx.cookies.set('token', user._id, {
                maxAge: 1000*60*60*24*7,
                httpOnly: false,
            });
        } else {
            message = '账号或密码错误';
        }
    }
    ctx.body = { errcode, message }
})

// 获取用户信息
router.get('/getUser', async (ctx, next) => {
    const { _id } = ctx.request.query;
    let errcode = 1, data = {};
    const user = await UserModel.findOne({ _id }, filter);
    if(user) {
        errcode = 0;
        data = user;
    }
    ctx.body = { errcode, data };
});

// 获取用户发文，发图等信息
router.get('/getUserPublish', async (ctx, next) => {
    const { user_id } = ctx.request.query;
    let errcode = 1, data = {};
    const articles = await ArticleModel.find({ user_id });
    const images = await ImageModel.find({ user_id });
    if(articles&&articles.length > 0) {
        errcode = 0;
        data.articles = articles.length;
    } 
    if(images&&images.length > 0) {
        let imageSum = 0;
        images.forEach(item => {
            imageSum += item.img_url.length
        })
        errcode = 0;
        data.images = imageSum;
    }
    ctx.body = { errcode, data };
});




//用户前台显示
// 获取所有文章信息
router.get('/getArticles', async (ctx, next) => {
    let data;
    let errcode;
    let message;
    try {
        data = await ArticleModel.find({}, filter);
        errcode = 0;
    } catch (err) {
        message = '没有找到数据';
        errcode = 1;
    }
    ctx.body = errcode == 0 ? { errcode, data: data.reverse() } : { errcode, message };
})

// 获取单篇文章信息
// router.get('/getSingleAritcle', async (ctx, next) => {
//     const { _id } = ctx.request.body;
//     let res;
//     try {
//         res = {
//             errcode: 0,
//             data: await ArticleModel.find({ _id }, filter)
//         }
//     } catch (err) {
//         res = {
//             errcode: 1,
//             message: '没有找到数据'
//         }
//     }
//     ctx.body = res;
// })

module.exports = router;