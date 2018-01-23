import React, { Component } from 'react';

import logoImg from './job.png'
import './logo.css';

class Logo extends Component {
  render () {
    return (
      <div className="logoContainer">
        <img src={logoImg} alt="Logo"/>
      </div>
    );
  }
}

export default Logo;