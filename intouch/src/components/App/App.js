import React, { Component } from 'react';
import api from '../api';
import FontIcon from 'material-ui/FontIcon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
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

  render() {
    return (
      <MuiThemeProvider>
        <AppBar
          title={<span style={styles.title}>In Touch</span>}
          iconElementRight={
            <FlatButton
              href="auth/linkedin"
              target="_blank"
              labelPosition="before"
              label="Login"
              primary={true}
              style={styles.button}
              icon={<FontIcon className="fa fa-linkedin-square"/>}
            />
          }
        />
        
      </MuiThemeProvider>
    );
  }
}

export default App;
