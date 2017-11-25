import React, { Component } from 'react';
import axios from 'axios';

import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import { Icons } from 'grommet';

import Header from '../../components/Header';

import './User.scss';

class User extends Component {
  handleDownload = e => {
    e.preventDefault();

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
        method: 'post',
        url: 'http://10.10.13.213:8000/api/pdf',
        data: {
          template: 'cde'
        },
        responseType: 'blob'
      }).then(res => {
        const fileURL = URL.createObjectURL(res.data);
        window.open(fileURL);
      });
    });
  };

  render() {
    return (
      <div className="User">
        <Box full={true} flex={false}>
          <Header logged />
          <Box flex={true} justify="center">
            <Columns justify="center" maxCount={2}>
              <Box pad="medium">
                <Headline size="small" strong={true}>
                  {`Vous avez completez les formulaires des organismes suivants.`}
                </Headline>
                <Paragraph size="large">
                  {`Maintenant vous pouvez faire les démarches recommandées.`}
                </Paragraph>
              </Box>
              <Box pad="medium">
                <List>
                  <ListItem justify="between" separator="horizontal">
                    <span>CDE</span>
                    <span className="secondary">
                      <Box direction="row">
                        <Box pad="small">
                          <Button onClick={this.handleDownload}>
                            <Icons.Base.Download colorIndex="brand" />
                          </Button>
                        </Box>
                        <Box pad="small">
                          <Icons.Base.Send colorIndex="brand" />
                        </Box>
                      </Box>
                    </span>
                  </ListItem>
                  <ListItem justify="between">
                    <span>EEC</span>
                    <span className="secondary">
                      <Box direction="row">
                        <Box pad="small">
                          <Icons.Base.Download colorIndex="brand" />
                        </Box>
                        <Box pad="small">
                          <Icons.Base.Send colorIndex="brand" />
                        </Box>
                      </Box>
                    </span>
                  </ListItem>
                  <ListItem justify="between">
                    <span>Enercal</span>
                    <span className="secondary">
                      <Box direction="row">
                        <Box pad="small">
                          <Icons.Base.Download colorIndex="brand" />
                        </Box>
                        <Box pad="small">
                          <Icons.Base.Send colorIndex="brand" />
                        </Box>
                      </Box>
                    </span>
                  </ListItem>
                  <ListItem justify="between">
                    <span>OPT</span>
                    <span className="secondary">
                      <Box direction="row">
                        <Box pad="small">
                          <Icons.Base.Download colorIndex="brand" />
                        </Box>
                        <Box pad="small">
                          <Icons.Base.Send colorIndex="brand" />
                        </Box>
                        <Box pad="small">
                          <Icons.Base.LocationPin colorIndex="brand" />
                        </Box>
                      </Box>
                    </span>
                  </ListItem>
                </List>
              </Box>
            </Columns>
            <Columns justify="center" size="medium" maxCount={2}>
              <Box pad="medium">
                <Button
                  label="Localiser les organismes"
                  primary={true}
                  onClick={() => {}}
                />
              </Box>
              <Box pad="medium">
                <Button
                  label="Commander un concierge"
                  primary={true}
                  onClick={() => {}}
                />
              </Box>
            </Columns>
          </Box>
        </Box>
      </div>
    );
  }
}

export default User;
