import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }

    // get user info
    axios.get('/user/info')
      .then(res => {
        if (res.status == 200) {
          if (res.data.code == 0) {
            // 有登陆信息
          } else {
            this.props.history.push('/login');
          }
        }
      })

    // 是否登录
    // 现在的url地址 login不需要跳转
    // 用户的type 身份是employer 还是 employee
    // 用户信息是否完善
  }

  render() {
    return null;
  }
}

export default AuthRoute;
