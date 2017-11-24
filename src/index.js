import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'grommet-css/build/index.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
