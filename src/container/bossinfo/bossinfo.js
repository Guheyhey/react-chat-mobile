import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  {update}
)
class BossInfo extends Component {
  constructor(props) {
		super(props)
		this.state = {
			title:'',
			description:'',
			company:'',
			money:''
		}
	}
	onChange(key,val){
		this.setState({
			[key]:val
		})
	}

  render () {
    const path = this.props.location.pathname
		const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
        <NavBar
          mode="dark"
        >Boss Profile</NavBar>

        <AvatarSelector
          selectAvatar={(imgname)=>{
            this.setState({
              avatar:imgname
            })
          }}
        ></AvatarSelector>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          Job Title
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>
          Company
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>
          Salary
        </InputItem>
        <TextareaItem
          rows={3}
          autoHeight
          title='Description'
          onChange={(v) => this.onChange('description', v)}>
        </TextareaItem>
        <Button
          onClick={() => {
            this.props.update(this.state);
          }}
          type='primary'>Save</Button>
      </div>
    )
  }
}

export default BossInfo;
