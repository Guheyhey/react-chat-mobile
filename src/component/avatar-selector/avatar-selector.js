import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {

  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
		super(props)
		this.state={}
	}

  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',').map(v => {
        return {
          icon: require(`../img/${v}.png`),
          text: v
        }
      })
    const gridHeader = this.state.icon
      ? (
        <div>
          <span>Picked Avatar </span>
          <img style={{width: 20}} src={this.state.icon} alt=""/>
        </div>
      )
      : 'Please pick an avatar'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            onClick={elm => {
              this.setState(elm);
              this.props.selectAvatar(elm.text);
            }}
            data={avatarList}
            columnNum={5}></Grid>
        </List>

      </div>
    )
  }
}

export default AvatarSelector;
