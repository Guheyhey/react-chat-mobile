import React, { Component } from 'react';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Logo from '../../component/logo/logo';
import { register } from '../../redux/user.redux';
import appForm from '../../component/app-form/app-form';

@connect(
  state => state.user,
  { register }
)
@appForm
class Register extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   user: '',
    //   pwd: '',
    //   repeatpwd: '',
    //   type: 'genius' // or 'boss'
    // }
    //
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius');
  }

  // handleChange (key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleRegister () {
    this.props.register(this.props.state)
  }

  render () {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {/* redirectTo comes from redux state.user */}
        { this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null }
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null }
          <InputItem
            onChange={v => this.props.handleChange('user', v)}>
            Username
          </InputItem>

          <WhiteSpace />

          <InputItem
            type="password"
            onChange={v => this.props.handleChange('pwd', v)}>
            Password
          </InputItem>

          <WhiteSpace />

          <InputItem
            type="password"
            onChange={v => this.props.handleChange('repeatpwd', v)}>
            Confirm
          </InputItem>

          <WhiteSpace />

          <RadioItem
            checked={this.props.state.type === 'genius'}
            onChange={() => this.props.handleChange('type', 'genius')}>
            I am an employee
          </RadioItem>
          <RadioItem
            checked={this.props.state.type === 'boss'}
            onChange={() => this.props.handleChange('type', 'boss')}>
            I am an employer
          </RadioItem>

          <WhiteSpace />

          <Button
            type='primary'
            onClick={this.handleRegister}
          >Register</Button>
        </List>
      </div>
    );
  }
}

export default Register;
