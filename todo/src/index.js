import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
// import App from './App' // eslint-disable-line no-unused-vars
import './index.css'

window.todos = {

todos: [],

subscribe (onChange) {
  this.onChange = onChange
},

unsubscribe () {
  this.onChange = null
},

add (todo) {
  this.todos.push(todo)
  this.onChange && this.onChange(this.todos)
},

toggleTodo (todo) {
  todo.isCompleted = !todo.isCompleted
  this.onChange && this.onChange(this.todos)
}
}

const withTodos = Component => (class extends React.Component {
constructor () {
  super()
  this.state = {
    todos: [],
    staus: 'all'
  }

  this.onChange = this.onChange.bind(this)
}

componentDidMount () {
  console.log('didmoutn')
  console.log(todos)// eslint-disable-line
  todos.subscribe(this.onChange) // eslint-disable-line
}

componentWillUnmount () {
  todos.unsubscribe() // eslint-disable-line
}

onChange (todos) {
  this.setState({todos})
}

render () {
  return <Component todos={this.state.todos} />
}
})

let Todos = ({todos}) => (// eslint-disable-line
<div>
  <Counter todos={todos}/>
  <ul>
    {todos.map((todo, i) => (
      <li key={i} onClick={window.todos.toggleTodo.bind(window.todos, todo)}>{todo.title} </li>
    ))}
  </ul>
</div>
)

let Counter = ({todos}) => (// eslint-disable-line
<div>
  <h1>Counter</h1>
  <h2>total: {todos.length}</h2>
  <h2>completed: {todos.filter((todo) => todo.isCompleted).length}</h2>
  <h2>not completed: {todos.filter((todo) => !todo.isCompleted).length}</h2>
</div>
)

Todos = withTodos(Todos)

ReactDOM.render(<Todos/>, document.getElementById('root'))

window.todos.add({"title": "todo1", "isCompleted": false })
window.todos.add({"title": "todo2", "isCompleted": false })
window.todos.add({"title": "todo3", "isCompleted": true })
