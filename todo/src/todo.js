import React from 'react' // eslint-disable-line no-unused-vars
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Badge from 'material-ui/Badge'

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
    console.log('onChange', todo)
    this.createTodo(todo)
  }

  createTodo (todo) {
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
    <Filter todos={todos} filter={filter} onFilter={onFilter}/>
    <List>
      {todos.map(function (todo, i) { // eslint-disable-line
        if (filter.done === undefined || filter.done === todo.done) {
          return <ListItem style={{ 'borderBottom': 'solid 1px #ccc'}} key={i} onClick={() => toggleTodo(todo)} primaryText={todo.title} leftCheckbox={<Checkbox checked={todo.done}/>} />
        }
      })}
    </List>
  </div>
)

let Filter = ({todos, filter, onFilter}) => (
  <div>
    <Badge
      badgeContent={todos.length}
      secondary={true}
      badgeStyle={{top: 5, right: 5}}
      style={{padding: '22px 0px 0px 12px'}}
    >
    <FlatButton onClick={() => onFilter(undefined)} label="all" secondary={filter.done === undefined} />
  </Badge>
  <Badge
    badgeContent={todos.filter((todo) => !todo.done).length }
    secondary={true}
    badgeStyle={{top: 5, right: 5}}
    style={{padding: '22px 0px 0px 12px'}}
  >
    <FlatButton onClick={() => onFilter(false)} label="active" secondary={filter.done === false} />
    </Badge>
      <Badge
        badgeContent={todos.filter((todo) => todo.done).length}
        secondary={true}
        badgeStyle={{top: 5, right: 5}}
        style={{padding: '22px 0px 0px 12px'}}
      >
    <FlatButton onClick={() => onFilter(true)} label="done" secondary={filter.done === true} />
    </Badge>
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
    let newTodo = this.state.value
    if ('' !== newTodo) {
      this.props.createTodo({'title': newTodo, 'done': false})
      this.setState({value: ''})
    }
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
        <FloatingActionButton mini={true} type='submit' label='Add'>
          <ContentAdd />
     </FloatingActionButton>
      </form>
    )
  }
}

Todos = withTodos(Todos, todos)

window.todos = {
  add: todos.add.bind(todos)
}

export default Todos
