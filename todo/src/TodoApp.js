import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import todoBrowserApi from './todoBrowserApi'

const withTodos = (Component, todos) => (class extends React.Component {
  constructor () {
    super()
    this.state = {
      todos: [],
      filter: {}
    }

    this.onChange = this.onChange.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.onFilter = this.onFilter.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
  }

  componentDidMount () {
    todos.subscribe(this.onChange)
    todos.add({"title": "do it", 'done': false})
    todos.add({"title": "daje", 'done': false})
    todos.add({"title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum", 'done': true})
    todos.add({"title": "Sed ut perspiciatis unde omnis iste natus error ", 'done': false})
    todos.add({"title": "pota ciao", 'done': true})
  }

  componentWillUnmount () {
    todos.unsubscribe()
  }

  onChange (todo) {
    this.createTodo(todo)
  }

  createTodo (todo) {
    if (typeof todo.title === "undefined" || todo.title.trim() === '') {
      throw new Error('the Todo object must contain the title attribute')
    }

    if (typeof todo.done === "undefined" || todo.done !== true ) {
      todo.done = false
    }

    this.state.todos.push(todo)
    this.setState({todos: this.state.todos})
  }

  toggleTodo (todo) {
    todo.done = !todo.done
    this.setState(this.state)
  }

  onFilter (value) {
    this.filterStatus = value
    this.setState({filter: {'done': value}})
  }

  render () {
    return <Component todos={this.state.todos} createTodo={this.createTodo} toggleTodo={this.toggleTodo} filter={this.state.filter} onFilter={this.onFilter} />
  }
})

let Todos = ({todos, createTodo, toggleTodo, filter, onFilter}) => (  // eslint-disable-line
  <div className="container">
    <TodoForm todos={todos} createTodo={createTodo} />
    <TodoFilter todos={todos} filter={filter} onFilter={onFilter}/>
    <TodoList todos={todos} filter={filter} toggleTodo={toggleTodo} />
  </div>
)

Todos = withTodos(Todos, todoBrowserApi)

window.todos = {
  add: todoBrowserApi.add.bind(todoBrowserApi)
}

export default Todos
