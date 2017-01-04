import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

const style = {'borderBottom': 'solid 1px #ccc'}

let TodoList = ({todos, toggleTodo, filter}) => (
<List>
  {
    todos.map(function (todo, i) {
      if (filter.done === undefined || filter.done === todo.done) {
        return <ListItem style={style}
                  key={i}
                  onClick={() => toggleTodo(todo)}
                  primaryText={todo.title}
                  leftCheckbox={<Checkbox checked={todo.done}/>}
                />
      }
      return ''
    })

  }
</List>
)

export default TodoList
