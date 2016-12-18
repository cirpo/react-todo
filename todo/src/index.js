import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
// import App from './App' // eslint-disable-line no-unused-vars
import './index.css'

let todoslist = {

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
  },
  filter (filter) {
    this.onChange && this.onChange(this.todos, filter)
  }
}

const withTodos = Component => (class extends React.Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      filteredTodos: [],
      filter: 'all'
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
  //  console.log(todoslist)// eslint-disable-line
    todoslist.subscribe(this.onChange) // eslint-disable-line
  }

  componentWillUnmount () {
    todoslist.unsubscribe() // eslint-disable-line
  }

  onChange (todos, filter) {
    console.log('state', this.state)
    filter = filter || this.state.filter
    console.log('todos', todos)
    console.log('filter', filter)
    let filteredTodos = todos

    if (filter === 'completed') {
    //  console.log('completed')
      filteredTodos = todos.filter(todo => todo.isCompleted)
    }

    if (filter === 'uncompleted') {
    //  console.log('uncompleted')
      filteredTodos = todos.filter(todo => !todo.isCompleted)
    }

    console.log('filteredTodos', filteredTodos)
    this.setState({todos, filteredTodos, filter})
  }

  render () {
    return <Component todos={this.state.todos} filteredTodos={this.state.filteredTodos} />
  }
})

let Todos = ({todos, filteredTodos}) => ( // eslint-disable-line
  <div>
    <Counter todos={todos}/>
    <Filter />
    <ul>
      {filteredTodos.map((todo, i) => (
        <li key={i} onClick={todoslist.toggleTodo.bind(todoslist, todo)}>{todo.title} </li>
      ))}
    </ul>
  </div>
)

let Filter = ({todos}) => (
    <div>
      <div onClick={todoslist.filter.bind(todoslist, 'completed')}>completed  </div>
      <div onClick={todoslist.filter.bind(todoslist, 'uncompleted')}> uncompleted</div>
      <div onClick={todoslist.filter.bind(todoslist, 'all')}> all</div>
    </div>
)

let Counter = ({todos}) => ( // eslint-disable-line
  <div>
    <h2>Counter</h2>
    <h4>total: {todos.length}</h4>
    <h4>completed: {todos.filter((todo) => todo.isCompleted).length}</h4>
    <h4>not completed: {todos.filter((todo) => !todo.isCompleted).length}</h4>
  </div>
)

Todos = withTodos(Todos)

ReactDOM.render(<Todos/>, document.getElementById('root'))

todoslist.add({ 'title': 'todo1', 'isCompleted': false })
todoslist.add({ 'title': 'todo2', 'isCompleted': false })
todoslist.add({ 'title': 'todo3', 'isCompleted': true })

window.todos = {
  add: todoslist.add.bind(todoslist)
}
