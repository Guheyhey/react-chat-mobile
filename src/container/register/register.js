import React, { Component } from 'react';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';

import Logo from '../../component/logo/logo';
import { register } from '../../redux/user.redux';

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius' // or 'boss'
    }

    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    console.log("props", this.props);
    console.log("state", this.state);
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  handleRegister () {
    this.props.register(this.state)
  }

  render () {
    const RadioItem = Radio.RadioItem;
    const { type } = this.state;
    return (
      <div>
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null }
          <InputItem
            onChange={v => this.handleChange('user', v)}>
            Username
          </InputItem>

          <WhiteSpace />

          <InputItem
            type="password"
            onChange={v => this.handleChange('pwd', v)}>
            Password
          </InputItem>

          <WhiteSpace />

          <InputItem
            type="password"
            onChange={v => this.handleChange('repeatpwd', v)}>
            Confirm
          </InputItem>

          <WhiteSpace />

          <RadioItem
            checked={type === 'genius'}
            onChange={() => this.handleChange('type', 'genius')}>
            I am employee
          </RadioItem>
          <RadioItem
            checked={type === 'boss'}
            onChange={() => this.handleChange('type', 'boss')}>
            I am employer
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
