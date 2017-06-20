import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/App/App';
import LinkedIn from './components/LinkedIn/LinkedIn';
import LinkedInCallback from './components/LinkedIn/LinkedInCallback';
import Login from './components/LinkedIn/Login';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="auth/linkedin" component={LinkedIn}/>
      <Route path="auth/linkedin/callback" component={LinkedInCallback}/>
      <Route path="auth/login" component={Login}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
