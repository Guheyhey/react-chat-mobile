import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, WhiteSpace } from 'antd-mobile';

@connect(
  state => state.user
)
class User extends Component {
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
        <Item>Logout</Item>
      </div>
    ) : null
  }
}

export default User;
