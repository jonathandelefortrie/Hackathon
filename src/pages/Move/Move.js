import React, { Component } from 'react';
import axios from 'axios';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import Form from 'grommet/components/Form';
import Paragraph from 'grommet/components/Paragraph';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import CheckBox from 'grommet/components/CheckBox';
import Button from 'grommet/components/Button';
import Columns from 'grommet/components/Columns';
import Header from 'grommet/components/Header';
import Animate from 'grommet/components/Animate';
import Select from 'grommet/components/Select';
import Card from 'grommet/components/Card';
import { Icons } from 'grommet';

import './Move.scss';

import Logo from '../../components/Logo';

const Question = ({ onNext }) => {
  return (
    <Box flex={true} justify="center">
      <Animate
        enter={{ animation: 'fade', duration: 1000, delay: 0 }}
        keep={true}>
        <Heading align="center">{`Prevenez les organismes de votre changement d'adresse.`}</Heading>
        <Columns justify="center" size="medium" maxCount={2}>
          <Box pad="medium">
            <Button
              label="Indispensable"
              primary={true}
              onClick={onNext('indispensable')}
            />
          </Box>
          <Box pad="medium">
            <Button label="Recommandé" primary={true} onClick={() => {}} />
          </Box>
        </Columns>
        <Paragraph align="center" style={{ margin: 'auto' }}>Un formulaire unique pour toutes vos démarches.</Paragraph>
      </Animate>
    </Box>
  );
};

class Essential extends Component {
  state = {
    step: 1,
    user: {
      prenom: '',
      nom: '',
      tel_fix: '',
      tel_bureau: '',
      tel_mobile: '',
      email: '',
      adresse_appt: '',
      adresse_etage: '',
      adresse_immeuble: '',
      adresse_lot: '',
      adresse_lot_num: '',
      adresse_quartier: '',
      adresse_num: '',
      adresse_rue: '',
      bp: '',
      commune: ''
    },
    services: {
      mairie: false,
      cde: false,
      eec: false,
      enercal: false,
      dittt: false,
      dsf: false,
      cafat: false,
      tresor: false
    },
    submitting: false
  };

  handleNext = e => {
    e.preventDefault();

    this.setState({ step: this.state.step + 1 });
  };

  handleBack = e => {
    e.preventDefault();

    this.setState({ step: this.state.step - 1 });
  };

  handleChangeServices = e => {
    const { name, checked } = e.target;

    this.setState({ services: { ...this.state.services, [name]: checked } });
  };

  handleChangeUser = ({ target, option }) => {
    const { name, value } = target;

    this.setState({ user: { ...this.state.user, [name]: option || value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { user } = this.state;

    this.setState({ submitting: true }, () => {
      axios({
        method: 'get',
        url: 'http://10.10.13.213:8000/api/auth',
        auth: {
          username: 'test',
          password: 'test'
        }
      }).then(res => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${
          res.data.token
        }`;
        axios({
          method: 'put',
          url: 'http://10.10.13.213:8000/api/user',
          data: {
            ...user
          }
        }).then(() => {
          this.setState({ submitting: false, step: this.state.step + 1 });
        });
      });
    });
  };

  render() {
    const { step, user, services, submitting } = this.state;

    return (
      <Box flex={true} justify="center">
        <Form plain={true} onSubmit={this.handleSubmit}>
          {step === 1 && (
            <Animate
              enter={{ animation: 'fade', duration: 1000, delay: 0 }}
              keep={true}>
              <Heading align="center">
                {`Selectionnez les organismes à prévenir de votre déménagement.`}
              </Heading>
              <Columns size="medium" justify="center" maxCount={2}>
                <Box basis="1/2" margin="small">
                  <Box pad="medium">
                    <CheckBox
                      label="Mairie"
                      name="mairie"
                      toggle={true}
                      checked={services.mairie}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="CDE"
                      name="cde"
                      toggle={true}
                      checked={services.cde}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="EEC"
                      name="eec"
                      toggle={true}
                      checked={services.eec}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="Enercal"
                      name="enercal"
                      toggle={true}
                      checked={services.enercal}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                </Box>
                <Box basis="1/2" margin="small">
                  <Box pad="medium">
                    <CheckBox
                      label="DITTT"
                      name="dittt"
                      toggle={true}
                      checked={services.dittt}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="DSF"
                      name="dsf"
                      toggle={true}
                      checked={services.dsf}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="CAFAT"
                      name="cafat"
                      toggle={true}
                      checked={services.cafat}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                  <Box pad="medium">
                    <CheckBox
                      label="Tresor Public"
                      name="tresor"
                      toggle={true}
                      checked={services.tresor}
                      onChange={this.handleChangeServices}
                    />
                  </Box>
                </Box>
              </Columns>
              <Columns justify="center" size="medium" maxCount={2}>
                <Box pad="medium">
                  <Button
                    label="Obtenir les documents"
                    primary={true}
                    onClick={() => {}}
                  />
                </Box>
                <Box pad="medium">
                  <Button
                    label="Remplir les documents"
                    primary={true}
                    onClick={this.handleNext}
                  />
                </Box>
                <Box pad="medium">
                  <Button
                    label="Besoin d'aide"
                    primary={true}
                    onClick={() => {}}
                  />
                </Box>
              </Columns>
            </Animate>
          )}
          {step === 2 && (
            <Animate
              enter={{ animation: 'fade', duration: 1000, delay: 0 }}
              keep={true}>
              <Heading align="center">
                {`Renseignez les informations nécessaires.`}
              </Heading>
              <Columns justify="center" maxCount={2}>
                <Box pad="medium">
                  <FormField htmlFor="prenom" label="Prénom">
                    <TextInput
                      id="prenom"
                      name="prenom"
                      value={user.prenom}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium">
                  <FormField htmlFor="nom" label="Nom de famille">
                    <TextInput
                      id="nom"
                      name="nom"
                      value={user.nom}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium">
                  <FormField htmlFor="email" label="Mail">
                    <TextInput
                      id="email"
                      name="email"
                      value={user.email}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium">
                  <FormField htmlFor="tel_mobile" label="Mobilis">
                    <TextInput
                      id="tel_mobile"
                      name="tel_mobile"
                      value={user.tel_mobile}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium">
                  <FormField htmlFor="tel_fix" label="Téléphone fixe">
                    <TextInput
                      id="tel_fix"
                      name="tel_fix"
                      value={user.tel_fix}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium">
                  <FormField htmlFor="tel_bureau" label="Téléphone bureau">
                    <TextInput
                      id="tel_bureau"
                      name="tel_bureau"
                      value={user.tel_bureau}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
              </Columns>
              <Columns justify="center" size="medium" maxCount={2}>
                <Box pad="medium">
                  <Button label="Précédent" onClick={this.handleBack} />
                </Box>
                <Box pad="medium">
                  <Button
                    label="Suivant"
                    primary={true}
                    onClick={this.handleNext}
                  />
                </Box>
              </Columns>
            </Animate>
          )}
          {step === 3 && (
            <Animate
              enter={{ animation: 'fade', duration: 1000, delay: 0 }}
              keep={true}>
              <Heading align="center">
                {`Renseignez les informations nécessaires.`}
              </Heading>
              <Columns justify="center" size="large">
                <Box pad="medium" direction="row">
                  <FormField
                    htmlFor="adresse_num"
                    label="Numéro"
                    className="adresse_num">
                    <TextInput
                      id="adresse_num"
                      name="adresse_num"
                      value={user.adresse_num}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField htmlFor="adresse_rue" label="Rue">
                    <TextInput
                      id="adresse_rue"
                      name="adresse_rue"
                      value={user.adresse_rue}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box pad="medium" direction="row">
                  <FormField htmlFor="bp" label="Boite Postale">
                    <TextInput
                      id="bp"
                      name="bp"
                      value={user.bp}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField htmlFor="commune" label="Commune">
                    <Select
                      id="commune"
                      name="commune"
                      value={user.commune}
                      options={['Nouméa', 'Dumbéa']}
                      onChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
              </Columns>
              <Columns justify="center" size="large">
                <Box direction="row" pad="medium">
                  <FormField htmlFor="adresse_appt" label="Appt">
                    <TextInput
                      id="adresse_appt"
                      name="adresse_appt"
                      value={user.adresse_appt}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField htmlFor="adresse_etage" label="Etage">
                    <TextInput
                      id="adresse_etage"
                      name="adresse_etage"
                      value={user.adresse_etage}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField htmlFor="adresse_immeuble" label="Immeuble">
                    <TextInput
                      id="adresse_immeuble"
                      name="adresse_immeuble"
                      value={user.adresse_immeuble}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
                <Box direction="row" pad="medium">
                  <FormField htmlFor="adresse_lot_num" label="N° lot">
                    <TextInput
                      id="adresse_lot_num"
                      name="adresse_lot_num"
                      value={user.adresse_lot_num}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField htmlFor="adresse_lot" label="Lotissement">
                    <TextInput
                      id="adresse_lot"
                      name="adresse_lot"
                      value={user.adresse_lot}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
              </Columns>
              <Columns justify="center" size="large">
                <Box pad="medium" direction="row">
                  <FormField htmlFor="adresse_quartier" label="Quartier">
                    <TextInput
                      id="adresse_quartier"
                      name="adresse_quartier"
                      value={user.adresse_quartier}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                  <FormField
                    htmlFor="cp"
                    label="Code Postal"
                    className="adresse_cp">
                    <TextInput
                      id="cp"
                      name="cp"
                      value={user.cp}
                      onDOMChange={this.handleChangeUser}
                    />
                  </FormField>
                </Box>
              </Columns>
              <Columns justify="center" size="medium" maxCount={2}>
                <Box pad="medium">
                  <Button label="Précédent" onClick={this.handleBack} />
                </Box>
                <Box pad="medium">
                  <Button
                    disabled={submitting}
                    label="Soumettre le formulaire"
                    primary={true}
                    type="submit"
                  />
                </Box>
              </Columns>
            </Animate>
          )}
          {step === 4 && (
            <Animate
              enter={{ animation: 'fade', duration: 1000, delay: 0 }}
              keep={true}>
              <Columns justify="center">
                <Box className="checkmark">
                  <Icons.Base.Checkmark size="huge" colorIndex="brand" />
                </Box>
                <Box>
                  <Card
                    heading={
                      <Heading>
                        Félicitations Mr. Joe Doe vos formulaires sont prêts.
                      </Heading>
                    }
                    description="Vous recevrez un email avec vos identifiants de compte eCity Yeah."
                    size="large"
                    link={
                      <Anchor
                        href="/user"
                        primary={true}
                        label="Obtenir les documents"
                      />
                    }
                  />
                </Box>
              </Columns>
            </Animate>
          )}
        </Form>
      </Box>
    );
  }
}

class Move extends Component {
  handleNext = type => {
    return e => {
      e.preventDefault();

      this.props.history.push(`${this.props.location.pathname}/${type}`);
    };
  };

  render() {
    const { match: { params } } = this.props;
    let path = '';

    return (
      <div className="Move">
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
          {!params.type && <Question onNext={this.handleNext} />}
          {params.type === 'indispensable' && (
            <Essential onNext={this.handleNext} />
          )}
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

export default Move;
