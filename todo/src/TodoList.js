import React from 'react' // eslint-disable-line no-unused-vars
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'


let TodoList = ({todos, toggleTodo, filter}) => (
<List>
  {
    todos.map(function (todo, i) { // eslint-disable-line
      if (filter.done === undefined || filter.done === todo.done) {
        return <ListItem style={{ 'borderBottom': 'solid 1px #ccc'}}
                key={i}
                onClick={() => toggleTodo(todo)}
                primaryText={todo.title}
                leftCheckbox={<Checkbox checked={todo.done}/>}
                />
              }
    })
  }
</List>
)

export default TodoList
