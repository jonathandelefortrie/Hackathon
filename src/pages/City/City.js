import React, { Component } from 'react';

import Anchor from 'grommet/components/Anchor';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Animate from 'grommet/components/Animate';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import './City.scss';

import Logo from '../../components/Logo';
import scriptLoader from '../../libs/scriptLoader';

class CityMap extends Component {
  locations = [];

  state = {
    school: false,
    opt: false
  };

  componentDidMount() {
    const { address: { lat, lng } } = this.props;
    const element = this.refs.CityMap.boxContainerRef;
    this.map = new global.google.maps.Map(element, {
      mapTypeId: global.google.maps.MapTypeId.ROADMAP
    });

    this.map.data.setStyle({
      strokeColor: '#865CD6',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#865CD6',
      fillOpacity: 0.3
    });

    global.google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.map.setCenter(new global.google.maps.LatLng(lat, lng));
      this.map.setZoom(12);
    });
  }

  handleChange = e => {
    const { name, checked } = e.target;
    const { address: { lat, lng } } = this.props;
    this.setState({ [name]: checked }, () => {
      if (checked) {
        this.map.data.loadGeoJson(
          `http://10.10.13.213:8000/api/${name}?lat=${lat}&lon=${lng}`,
          null,
          data => {
            name === 'school' && this.handleZoom();
            this.locations[name] = data[0];
          }
        );
      } else {
        this.map.data.contains(this.locations[name]) &&
          this.map.data.remove(this.locations[name]);
      }
    });
  };

  handleZoom = () => {
    const map = this.map;
    const { address: { lat, lng } } = this.props;
    const bounds = new global.google.maps.LatLngBounds();

    map.data.forEach(feature => {
      CityMap.processPoints(feature.getGeometry(), bounds.extend, bounds);
    });

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds);
    } else {
      map.setCenter(new global.google.maps.LatLng(lat, lng));
      map.setZoom(this.zoom);
    }
  };

  static processPoints = (geometry, callback, ctx) => {
    if (geometry instanceof global.google.maps.LatLng) {
      callback.call(ctx, geometry);
    } else if (geometry instanceof global.google.maps.Data.Point) {
      callback.call(ctx, geometry.get());
    } else {
      geometry.getArray().forEach(g => {
        CityMap.processPoints(g, callback, ctx);
      });
    }
  };

  render() {
    const { school, opt } = this.state;

    return (
      <Animate
        enter={{ animation: 'fade', duration: 1000, delay: 0 }}
        keep={true}>
        <Heading align="center">{`Selectionnez les services à afficher.`}</Heading>
        <Columns justify="center" size="large">
          <Box pad="large" ref="CityMap" className="map" margin="small" />
          <Box pad="large" margin="small">
            <List>
              <ListItem justify="between">
                <span>Ecoles</span>
                <span className="secondary">
                  <Box direction="row">
                    <Box pad="small">
                      <CheckBox
                        checked={school}
                        name="school"
                        toggle={true}
                        onChange={this.handleChange}
                      />
                    </Box>
                  </Box>
                </span>
              </ListItem>
              <ListItem justify="between">
                <span>Banques</span>
                <span className="secondary">
                  <Box direction="row">
                    <Box pad="small">
                      <CheckBox toggle={true} />
                    </Box>
                  </Box>
                </span>
              </ListItem>
              <ListItem justify="between">
                <span>Postes</span>
                <span className="secondary">
                  <Box direction="row">
                    <Box pad="small">
                      <CheckBox
                        checked={opt}
                        name="opt"
                        toggle={true}
                        onChange={this.handleChange}
                      />
                    </Box>
                  </Box>
                </span>
              </ListItem>
            </List>
          </Box>
        </Columns>
      </Animate>
    );
  }
}

class CitySearch extends Component {
  config = {
    componentRestrictions: { country: 'nc' },
    types: ['address']
  };

  componentDidMount() {
    const input = this.refs.CitySearch.componentRef;
    this.search = new global.google.maps.places.Autocomplete(
      input,
      this.config
    );
    this.search.addListener('place_changed', this.handleChange);
  }

  handleChange = () => {
    const place = this.search.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const types = {
      administrative_area_level_1: 'long_name',
      administrative_area_level_2: 'long_name'
    };

    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (types[addressType]) {
        types[addressType] = place.address_components[i][types[addressType]];
      }
    }

    this.props.onAddressChange({
      address: place.formatted_address,
      city: types.administrative_area_level_2,
      province: types.administrative_area_level_1,
      lat,
      lng
    });
  };

  render() {
    const { address } = this.props;

    return (
      <Animate
        enter={{ animation: 'fade', duration: 1000, delay: 0 }}
        keep={true}>
        <Heading align="center">{`Quelle est votre localisation?`}</Heading>
        <Columns justify="center" size="large">
          <Box pad="medium">
            <FormField htmlFor="adresses">
              <TextInput
                ref="CitySearch"
                placeholder=""
                id="address"
                name="address"
                defaultValue={address}
              />
            </FormField>
          </Box>
        </Columns>
      </Animate>
    );
  }
}

class City extends Component {
  state = {
    map: false
  };

  handleAddressChange = address => {
    this.setState({ map: true, address }, () => {});
  };

  handleAddressBack = () => {
    this.setState({ map: false });
  };

  render() {
    const { map, address } = this.state;
    let path = '';

    return (
      <div className="City">
        <Box full={true} flex={false}>
          <Header pad="medium">
            <Box flex={true} justify="start" direction="row">
              {this.props.location.pathname.split('/').map((item, index) => {
                index !== 0 && (path += `/${item}`);
                return index === 0 ? (
                  <Anchor key={index} href="/" label="accueil" />
                ) : (
                  <Anchor key={index} href={path} label={`/${item}`} />
                );
              })}
            </Box>
            <Box direction="row" align="center" pad={{ between: 'medium' }}>
              <Menu direction="row" size="small" dropAlign={{ right: 'right' }}>
                <Anchor href="#">Solution</Anchor>
                <Anchor href="#">Services</Anchor>
                <Anchor href="#">Assistance</Anchor>
              </Menu>
            </Box>
          </Header>
          <Box flex={true} justify="center">
            {!map ? (
              <CitySearch onAddressChange={this.handleAddressChange} />
            ) : (
              <CityMap address={address} />
            )}
          </Box>
          <Box appCentered size="small">
            {map && (
              <Button
                onClick={this.handleAddressBack}
                plain={true}
                label="Retour"
                align="center"
              />
            )}
          </Box>
          <Footer justify="between" pad="medium">
            <Anchor href="/" style={{ width: '100px', height: '50px' }}>
              <Logo />
            </Anchor>
            <Box direction="row" align="center" pad={{ between: 'medium' }}>
              <Menu direction="row" size="small" dropAlign={{ right: 'right' }}>
                <Anchor href="#">{`Besoin d'aide`}</Anchor>
              </Menu>
            </Box>
          </Footer>
        </Box>
      </div>
    );
  }
}

export default scriptLoader(
  City,
  `${
    global.location.protocol
  }//maps.googleapis.com/maps/api/js?key=AIzaSyAvRqznlG0taAE0_sT7V4kPJxfHOMClegs&libraries=places&language=fr`
);
