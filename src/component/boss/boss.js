import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserCard from '../usercard/usercard';
import { getUserList } from '../../redux/chatuser.redux';

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {
  
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render () {
    return (
      <UserCard userlist={this.props.userlist}></UserCard>
    )
  }
}

export default Boss;
