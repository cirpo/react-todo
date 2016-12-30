import React from 'react' // eslint-disable-line no-unused-vars
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

let todos = {
  subscribe (onChange) {
    this.onChange = onChange
  },
  unsubscribe () {
    this.onChange = null
  },
  add (todo) {
    this.onChange && this.onChange(todo)
  }
}

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
    todos.add({"title": "do it", "isCompleted": false})
  }

  componentWillUnmount () {
    todos.unsubscribe()
  }

  onChange (todo) {
    console.log('onChange', todo)
    this.createTodo(todo)
    // this.setState({todo})
  }

  createTodo (todo) {
    this.state.todos.push(todo)
    this.setState({todos: this.state.todos})
  }

  toggleTodo (todo) {
    todo.isCompleted = !todo.isCompleted
    this.setState(this.state)
  }

  onFilter (value) {
    this.filterStatus = value
    this.setState({filter: {'isCompleted': value}})
  }

  render () {
    return <Component todos={this.state.todos} createTodo={this.createTodo} toggleTodo={this.toggleTodo} filter={this.state.filter} onFilter={this.onFilter} />
  }
})

let Todos = ({todos, createTodo, toggleTodo, filter, onFilter}) => (  // eslint-disable-line
  <div className="container">
    <Counter todos={todos}/>
    <Filter filter={filter} onFilter={onFilter}/>
    <TodoForm todos={todos} createTodo={createTodo} />
    <List>
      {todos.map(function (todo, i) { // eslint-disable-line
        if (filter.isCompleted === undefined || filter.isCompleted === todo.isCompleted) {
          return <ListItem key={i} onClick={() => toggleTodo(todo)} primaryText={todo.title} leftCheckbox={<Checkbox checked={todo.isCompleted}/>} />
        }
      })}
    </List>
  </div>
)

let Filter = ({filter, onFilter}) => (
  <div>
    <RaisedButton onClick={() => onFilter(true)} label="completed" secondary={filter.isCompleted === true} />
    <RaisedButton onClick={() => onFilter(false)} label="active" secondary={filter.isCompleted === false} />
    <RaisedButton onClick={() => onFilter(undefined)} label="all" secondary={filter.isCompleted === undefined} />
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
    this.state = {value: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    this.props.createTodo({'title': this.state.value, 'isCompleted': false})
    this.setState({value: ''})
    e.preventDefault()
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <TextField
          hintText="What's next?"
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
          />
        <input type='submit' value='Add'/>
      </form>
    )
  }
}

Todos = withTodos(Todos, todos)

window.todos = {
  add: todos.add.bind(todos)
}

export default Todos
