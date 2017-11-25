import React from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

export default props => {
  return (
    <Header justify="center">
      <Box
        size={{ width: { max: 'xxlarge' } }}
        direction="row"
        responsive={false}
        justify="start"
        align="center"
        pad={{ horizontal: 'medium' }}
        flex="grow">
        <Menu label="Label" inline={true} direction="row" flex="grow">
          <Title>City Yeah!</Title>
          <Anchor href="#">Solutions</Anchor>
          <Anchor href="#">Services</Anchor>
          <Anchor href="#">Assistance</Anchor>
        </Menu>
        <Box flex="grow" align="end">
          <Button label="Se connecter" onClick={() => {}} />
        </Box>
      </Box>
    </Header>
  );
};
