import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import App from './App' // eslint-disable-line no-unused-vars
import './index.css'

let todoslist = {

  todos: [],
  filterStatus: undefined,
  subscribe (onChange) {
    this.onChange = onChange
  },
  unsubscribe () {
    this.onChange = null
  },
  add (todo) {
    this.todos.push(todo)
    this.onChange && this.onChange(this.todos, this.filterStatus)
  },
  toggleTodo (todo) {
    todo.isCompleted = !todo.isCompleted
    this.onChange && this.onChange(this.todos, this.filterStatus)
  },
  filter (filter) {
    this.filterStatus = filter
    this.onChange && this.onChange(this.todos, this.filterStatus)
  },
  createTodo (todo) {
    this.todos.push({ 'title': todo, 'isCompleted': false })
    this.onChange && this.onChange(this.todos, this.filterStatus)
  }
}

const withTodos = Component => (class extends React.Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      filter: {}
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    todoslist.subscribe(this.onChange)
  }

  componentWillUnmount () {
    todoslist.unsubscribe()
  }

  onChange (todos, filterStatus) {
    let filter = {isCompleted: filterStatus}
    this.setState({todos, filter})
  }

  createTodo (todo) {
    todoslist.createTodo(todo)
  }

  handleFilter(value) {
      //todoslist.filter(value)
  }

  render () {
    return <Component createTodo={this.createTodo} todos={this.state.todos} filter={this.state.filter} onFilter={this.handleFilter} />
  }
})

let Todos = ({createTodo, todos, filter, onFilter}) => (  // eslint-disable-line
  <div>
    <Counter todos={todos}/>
    <Filter onFilter={onFilter}/>
    <TodoForm todos={todos} createTodo={createTodo} />
    <ul>
      {todos.map(function (todo, i) { // eslint-disable-line
        console.log('todos', filter)
        if (filter.isCompleted === undefined || filter.isCompleted === todo.isCompleted) {
          return <li key={i} onClick={todoslist.toggleTodo.bind(todoslist, todo)}>{todo.title} </li>
        }
      })}
    </ul>
  </div>
)

let Filter = ({todos, onFilter}) => (
  <div>
    // <div onClick={onFilter(true)}>completed  </div>
    // <div onClick={onFilter(false)}> uncompleted</div>
    // <div onClick={onFilter(undefined)}> all</div>
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

class TodoForm extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.createTodo(this.refs.todo.value)
    return
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input
          type='text'
          ref='todo'
          />
        <input type='submit' value='Add'/>
      </form>
    )
  }
}

Todos = withTodos(Todos)

ReactDOM.render(<Todos/>, document.getElementById('root'))

todoslist.add({ 'title': 'todo1', 'isCompleted': false })
todoslist.add({ 'title': 'todo2', 'isCompleted': false })
todoslist.add({ 'title': 'todo3', 'isCompleted': true })

window.todos = {
  add: todoslist.add.bind(todoslist)
}
