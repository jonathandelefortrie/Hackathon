import React, { Component } from 'react';

import GrommetIcon from 'grommet/components/icons/base/BrandGrommetOutline';
import SearchIcon from 'grommet/components/icons/base/Search';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

export default props => {
  return (
    <Header justify="center" colorIndex="neutral-4">
      <Box
        size={{ width: { max: 'xxlarge' } }}
        direction="row"
        responsive={false}
        justify="start"
        align="center"
        pad={{ horizontal: 'medium' }}
        flex="grow">
        <GrommetIcon colorIndex="brand" size="large" />
        <Box pad="small" />
        <Menu label="Label" inline={true} direction="row" flex="grow">
          <Anchor href="#">Solutions</Anchor>
          <Anchor href="#">Services</Anchor>
          <Anchor href="#">Products</Anchor>
          <Anchor href="#">About Us</Anchor>
          <Anchor href="#">Support</Anchor>
        </Menu>
        <Box flex="grow" align="end">
          <SearchIcon />
        </Box>
      </Box>
    </Header>
  );
};
