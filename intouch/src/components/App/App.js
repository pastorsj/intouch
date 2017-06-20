import React, { Component } from 'react';
import api from '../api';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

const styles = {
  button: {
    margin: 12,
  },
  title: {
    cursor: 'pointer',
  }
}

class App extends Component {

  getCompany() {
    api.get('/linkedin')
      .then((res) => {
        console.log('Sample Company', res);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getConnections() {
    api.get('/linkedin/connections')
      .then((res) => {
        console.log('Connections', res);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getMyProfile() {
    api.get('/linkedin/profile')
      .then((res) => {
        console.log('Profile', res);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <AppBar
          title={<span style={styles.title}>In Touch</span>}
          iconElementRight={
            <FlatButton
              href="auth/linkedin"
              labelPosition="before"
              label="Login"
              primary={true}
              style={styles.button}
              icon={<FontIcon className="fa fa-linkedin-square"/>}
            />
          }
        />
        <RaisedButton
          label="Get Company Test"
          primary={true}
          style={styles.button}
          onClick={this.getCompany}
        />
        <RaisedButton
          label="Get Connections Test"
          primary={true}
          style={styles.button}
          onClick={this.getConnections}
        />
        <RaisedButton
          label="Get Profile Test"
          primary={true}
          style={styles.button}
          onClick={this.getMyProfile}
        />
        {
          this.props.children
        }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
