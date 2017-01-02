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
    todoBrowserApi.add({"title": "do it", 'done': false})
    todoBrowserApi.add({"title": "daje", 'done': false})
    todoBrowserApi.add({"title": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum", 'done': true})
    todoBrowserApi.add({"title": "Sed ut perspiciatis unde omnis iste natus error ", 'done': false})
    todoBrowserApi.add({"title": "pota ciao", 'done': true})
  }

  componentWillUnmount () {
    todoBrowserApi.unsubscribe()
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
    return <Component
      todos={this.state.todos}
      createTodo={this.createTodo}
      toggleTodo={this.toggleTodo}
      filter={this.state.filter}
      onFilter={this.onFilter} />
  }
})
