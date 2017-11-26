import React from 'react';

import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

import Logo from './Logo';

export default ({ logged }) => {
  return (
    <Header justify="center">
      {logged ? (
        <Box
          size={{ width: { max: 'xxlarge' } }}
          direction="row"
          responsive={false}
          justify="start"
          align="center"
          pad={{ horizontal: 'medium' }}
          flex="grow">
          <Anchor href="/" style={{ width: '150px', height: '100px' }}>
            <Logo />
          </Anchor>
          <Menu label="Label" inline={true} direction="row" flex="grow">
            <Anchor href="#">Mon compte</Anchor>
            <Anchor href="#">Mes documents</Anchor>
          </Menu>
          <Box flex="grow" align="end">
            Bienvenue Joe Doe
          </Box>
        </Box>
      ) : (
        <Box
          size={{ width: { max: 'xxlarge' } }}
          direction="row"
          responsive={false}
          justify="start"
          align="center"
          pad={{ horizontal: 'medium' }}
          flex="grow">
          <Anchor href="/" style={{ width: '150px', height: '100px' }}>
            <Logo />
          </Anchor>
          <Menu label="Label" inline={true} direction="row" flex="grow">
            <Anchor href="#">Solutions</Anchor>
            <Anchor href="#">Services</Anchor>
            <Anchor href="#">Assistance</Anchor>
          </Menu>
          <Box flex="grow" align="end">
            <Button label="Se connecter" onClick={() => {}} />
          </Box>
        </Box>
      )}
    </Header>
  );
};
