/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import MenuLanding from './buildings/MenuLanding';
import ContentBuilding from './buildings/ContentBuilding';
import '../styles/general.css';
import '../styles/media.css';

class LandingBuilding extends Component {
    render() {
      return (
        <div>
          <MenuLanding />
          <ContentBuilding />
        </div>
      );
    }
  }

export default LandingBuilding;