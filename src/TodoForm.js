import React from 'react'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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

export default TodoForm
