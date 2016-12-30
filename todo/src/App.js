import React, { Component } from 'react'
import Todos from './todo.js'
import './App.css';
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
//window.todoslist.add({ 'title': 'todo1', 'isCompleted': false })
// todoslist.add({ 'title': 'todo2', 'isCompleted': false })
// todoslist.add({ 'title': 'todo3', 'isCompleted': true })
export default App;
