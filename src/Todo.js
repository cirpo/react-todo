import React from 'react'

export default (Component, todoBrowserApi) => (class extends React.Component {
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
    todoBrowserApi.subscribe(this.onChange)
    todoBrowserApi.add({'title': 'Buy RockWerchter camping tickets', 'done': false})
    todoBrowserApi.add({'title': 'Buy Milk!', 'done': false})
    todoBrowserApi.add({'title': 'Call a gardner', 'done': true})
    todoBrowserApi.add({'title': 'Update CV', 'done': false})
    todoBrowserApi.add({'title': 'Schedule Cuba trip', 'done': true})
  }

  componentWillUnmount () {
    todoBrowserApi.unsubscribe()
  }

  onChange (todo) {
    this.createTodo(todo)
  }

  createTodo (todo) {
    if (typeof todo.title === 'undefined' || todo.title.trim() === '') {
      throw new Error('the Todo object must contain the title attribute')
    }

    if (typeof todo.done === 'undefined' || todo.done !== true ) {
      todo.done = false
    }

    this.state.todos.push(todo)

    this.setState({todos: this.sortByDone(this.state.todos)})
  }

  sortByDone(todos) {
      return todos.sort((todoA, todoB) =>
       (todoA.done === todoB.done) ? 0 : todoA.done ? -1 : 1)
  }

  toggleTodo (todo) {
    todo.done = !todo.done

    this.setState({todos: this.state.todos})
  }

  onFilter (value) {
    this.filterStatus = value
    this.setState({todos: this.sortByDone(this.state.todos), filter: {'done': value}})
  }

  render () {
    return <Component
      todos={this.state.todos}
      createTodo={this.createTodo}
      toggleTodo={this.toggleTodo}
      filter={this.state.filter}
      onFilter={this.onFilter} />
  }
})
