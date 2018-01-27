import React, { Component } from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/user.redux';
import Logo from '../../component/logo/logo';
import appForm from '../../component/app-form/app-form';

@connect(
  state => state.user,
  { login }
)
@appForm
class Login extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   user: '',
    //   pwd: ''
    // }
    this.handleLogin = this.handleLogin.bind(this);
    this.register = this.register.bind(this);
  }

  register() {
    this.props.history.push('./register')
  }

  // handleChange (key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleLogin () {
    this.props.login(this.props.state);
  }

  render () {
    return (
      <div>
        { this.props.redirectTo && this.props.redirectTo !== '/login'
          ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo></Logo>
        <WingBlank>
          <List>
          { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null }
            <InputItem
              onChange={v => this.props.handleChange('user', v)}>
              Username</InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}>
              Password</InputItem>
          </List>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.handleLogin} type='primary'>Login</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type='primary'>Register</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;
