const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

// not display password and __v after mongoDB query
const _filter = {'pwd': 0, '__v': 0};

// Chat.remove({}, function(a,b){})

Router.get('/list', function (req, res) {
  // User.remove({}, function(e, d) {});
  const { type } = req.query;
  User.find({type: type}, _filter, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

Router.get('/getMsgList', function(req, res) {
  const user = req.cookies.userid;//注意是 cookies
  User.find({}, function(err, userdoc) {
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    // Chat.find({'$or': [{from: user, to: user}]}, function(err, doc) {
    //   if (!err) {
    //     return res.json({code: 0, msgs: doc, users: users})
    //   }
    // })
    Chat.find({'$or':[{from:user},{to:user}]}, function(err,doc) {
			if (!err) {
				return res.json({code: 0, msgs: doc, users: users})
			}
		})
  })
  // '$or': [{from: user, to: user}]
})

Router.post('/readmsg', function (req, res) {
  const userid = req.cookies.userid;
  const { from } = req.body;
  Chat.update(
    {from, to:userid},
    {'$set':{read:true}},
    {'multi':true},
    function(err, doc) {
      console.log(doc);
      if (!err) {
        return res.json({code: 0, num: doc.nModified})
      }
      return res.json({code: 1, msg: 'Fail to update'})
    }
  )
})

Router.post('/update', function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json.dumps({code: 1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({code: 0, data});
  })
})

Router.post('/register', function (req, res) {

  const {user, pwd, type} = req.body;
  User.findOne({user: user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: "Username already taken!"})
    }

    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: "Something wrong with backend"})
      }
      const {user, type, _id} = doc;
      res.cookie('userid', _id);
      return res.json({code: 0, data: {user, type, _id}});
    })
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body;
  // 第一个字段用来查询， 第二字段控制显示，此处不显示pwd
  // 第三个字段为 callback，处理错误或查询的结果
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: 'Username or password incorrect!'})
    }
    // 将用户登录信息保存在cookie中
    res.cookie('userid', doc._id);
    return res.json({code: 0, data: doc})
  })
})

Router.get('/info', function (req, res) {
  // check userInfo in cookie
  const {userid} = req.cookies;
  if (!userid) {
    return res.json({code: 1});
  }
  User.findOne({_id: userid}, _filter, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: 'Something wrong with backend'})
    }
    if ( doc ) {
      return res.json({code: 0, data: doc});
    }
  });
})

function md5Pwd(pwd) {
  const salt = 'this_salt_is_salty_dasdnkcnkahih544564&^*HU';
  return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;
