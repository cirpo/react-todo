import React from 'react' // eslint-disable-line no-unused-vars
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

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
    console.log('ciao this', this)
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
    // console.log('onChange', todos)
    this.setState({todos, filter})
  }

  createTodo (todo) {
    todoslist.createTodo(todo)
  }

  toggleTodo (todo) {
    todoslist.toggleTodo(todo)
  }

  onFilter (value) {
    todoslist.filter(value)
  }

  render () {
    return <Component todoslist={todoslist} todos={this.state.todos} createTodo={this.createTodo} toggleTodo={this.toggleTodo} filter={this.state.filter} onFilter={this.onFilter} />
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
    this.props.createTodo(this.state.value)
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

Todos = withTodos(Todos)

window.todos = {
  add: todoslist.add.bind(todoslist)
}

export default Todos
