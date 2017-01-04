import React, { Component } from 'react'
import TodoApp from './TodoApp.js'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'


const muiTheme = getMuiTheme({
  palette: {
    textColor: '#404040',
    primary1Color: "#78c500",
    accent1Color: "#ff8000"
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
