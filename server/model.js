const mongoose = require('mongoose');

// 链接 mongo，并使用chatApp这个集合
const DB_URL = 'mongodb://localhost:27017/chat-app';
mongoose.connect(DB_URL);
mongoose.Connection.on('connected', function() {
  console.log('mongo connect success');
})

const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},

    // 头像
    'avatar': {type: String},
    // 简介
    'description': {type: String}
  },
  chat: {

  }
}
