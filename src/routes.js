import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from 'grommet/components/App';
import pages from './pages';

export default (
  <App centered={false}>
    <Router>
      <div>
        <Route exact path="/" component={pages.Home} />
        <Route path="/user/:document?" component={pages.User} />
        <Route path="/demenage/:type?" component={pages.Move} />
        <Route path="/ville/:type?" component={pages.City} />
      </div>
    </Router>
  </App>
);
