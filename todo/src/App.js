import React, { Component } from 'react'
import Todos from './todo.js'
import './App.css';
import '../node_modules/material-design-lite/material.min.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <h2>TODO</h2>
        </div>
        <Todos/>
      </div>

    </MuiThemeProvider>
    )
  }
}

export default App;
