const mongoose = require('mongoose');
// 文章相关
const articleSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    type: { type: Number },
    publish_date: { type: String },
    img_url: { type: String }
});

const ArticleModel = mongoose.model('article', articleSchema);

exports.ArticleModel = ArticleModel;

// 图片相关
const imgSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    img_url: { type: Array, required: true },
});

const ImageModel = mongoose.model('image', imgSchema);

exports.ImageModel = ImageModel;


// 用户相关
const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    uid: { type: String, required: true },
    psd: { type: String, required: true }
})

const UserModel = mongoose.model('user', userSchema);

exports.UserModel = UserModel;