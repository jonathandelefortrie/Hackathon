import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Paragraph from 'grommet/components/Paragraph';

import Bot from '../../components/Bot';

import './Move.scss';

class Move extends Component {
  render() {
    return (
      <div className="Move">
        <Bot />
      </div>
    );
  }
}

export default Move;
