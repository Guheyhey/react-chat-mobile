import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import browserCookies from 'browser-cookies'

import { logoutSubmit } from '../../redux/user.redux';

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert;
    alert('Logout', 'Are you sure?',[
      { text: 'Cancel', onPress: () => console.log('cancel') },
      { text: 'Logout', onPress: () => {
        browserCookies.erase('userid'); // 清cookie
        // window.location.href = window.location.href; // 强制刷新
        this.props.logoutSubmit();
      } }
    ])
    // console.log('logout')
  }

  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;

    return props.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt={this.props.avatar}/>}
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />

        <List renderHeader={() => 'Position Introduction'}>
          <Item multipleLine wrap>
            {props.title}
            {props.description.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {props.money ? <Brief>Salary:&nbsp;{props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Item onClick={this.logout}>Logout</Item>
      </div>
    ) : <Redirect to={props.redirectTo}></Redirect>
  }
}

export default User;
