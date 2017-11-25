import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';

import Header from '../../components/Header';
import Form from '../../components/Form';

import './Home.scss';

import hero from '../../hero.jpg';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Box>
          <Header />
          <Hero
            className="Home__hero"
            backgroundImage={hero}>
            <Heading strong={true}>Facilitez vous la ville</Heading>
            <Form history={this.props.history} />
          </Hero>
          <Box align="center">
            <Box
              pad="large"
              align="center"
              textAlign="center"
              size={{ width: { max: 'xxlarge' } }}>
              <Heading tag="h1" margin="none">
                eCity Yeah, mes démarches et mes services de proximité à portée
                de clic.
              </Heading>
            </Box>
          </Box>
          <Box colorIndex="light-2" pad={{ vertical: 'large' }} align="center">
            <Box
              align="center"
              size={{ width: 'xxlarge' }}
              pad={{ horizontal: 'large' }}>
              <Heading tag="h2" strong={true}>
                {`Besoin d'aide`}
              </Heading>
            </Box>
          </Box>
          <Footer full="horizontal">
            <Box
              colorIndex="brand"
              pad="large"
              align="center"
              full="horizontal">
              <Box
                className="footer-cards-container"
                pad={{ vertical: 'medium' }}
                size={{ width: 'xxlarge' }}
                direction="row"
                flex="grow">
                <Card
                  pad={{ horizontal: 'large' }}
                  contentPad="medium"
                  heading="Lorem ipsum dolor sit amet"
                  label="Label"
                  basis="1/2"
                  link={
                    <Anchor href="http://www.grommet.io/docs/" primary={true}>
                      Learn More
                    </Anchor>
                  }
                  separator="right"
                />
                <Card
                  pad={{ horizontal: 'large' }}
                  contentPad="medium"
                  heading="Lorem ipsum dolor sit amet"
                  label="Label"
                  basis="1/2"
                  link={
                    <Anchor href="http://www.grommet.io/docs/" primary={true}>
                      Learn More
                    </Anchor>
                  }
                />
              </Box>
            </Box>
          </Footer>
        </Box>
      </div>
    );
  }
}

export default Home;
