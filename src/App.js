import React, { Component } from 'react'
import TodoApp from './TodoApp.js'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <h2>TODO</h2>
        </div>
        <TodoApp/>
      </div>

    </MuiThemeProvider>
    )
  }
}

export default App
