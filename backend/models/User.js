const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    avatar: {
        type:String,
        default: 'https://nogivruki.ua/wp-content/uploads/2018/08/default-user-image.png'
    }
});
//збережені пости, пости, підписки, лайки, коменти, date
module.exports = User = mongoose.model("user", UserSchema);