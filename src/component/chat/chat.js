import React, { Component } from 'react';
import { List, InputItem, NavBar } from 'antd-mobile';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux';

const socket = io('ws://localhost:9093');

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    // this.props.getMsgList();
    // this.props.recvMsg();
    // socket.on('recvmsg', (data) => { // 如果用function，会找不到this
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  handleSubmit() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''});
  }

  render () {
    // console.log(this.props)
    const user = this.props.match.params.user;
    const Item = List.Item;
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {user}
        </NavBar>
        {this.props.chat.chatmsg.map(v => {
          // const avatar = require(`../img/${users[v.from].avatar}.png`)
          return v.from === user ? (
            <List key={v._id}>
              <Item

              >{v.content}</Item>
            </List>
          ) : (
            <List key={v._id}>
              <Item
                extra={'avatar'}
                className='chat-me'
              >{v.content}</Item>
            </List>
          )

        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="Please enter"
              value={this.state.text}
              onChange={
                v => { this.setState({text: v}) }
              }
              extra={<span onClick={() => this.handleSubmit()}>Send</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat;
