import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Paragraph from 'grommet/components/Paragraph';

import Header from '../../components/Header';
import Form from '../../components/Form';

import './User.scss';

class User extends Component {
  render() {
    return (
      <div className="User">
        <Box>
          <Header logged />
        </Box>
      </div>
    );
  }
}

export default User;
