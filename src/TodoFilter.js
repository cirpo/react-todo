import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Badge from 'material-ui/Badge'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const style = {padding: '22px 0px 0px 12px'}
const badgeStyle = {top: 5, right: 5}

let TodoFilter = ({todos, filter, onFilter}) => (
  <div>
    <Badge
      badgeContent={todos.length}
      secondary={true}
      badgeStyle={badgeStyle}
      style={style}>
      <FlatButton onClick={() => onFilter(undefined)} label="all" secondary={filter.done === undefined} />
    </Badge>
    <Badge
      badgeContent={todos.filter((todo) => !todo.done).length }
      secondary={true}
      badgeStyle={badgeStyle}
      style={style}>
      <FlatButton onClick={() => onFilter(false)} label="active" secondary={filter.done === false} />
    </Badge>
    <Badge
      badgeContent={todos.filter((todo) => todo.done).length}
      secondary={true}
      badgeStyle={badgeStyle}
      style={style}>
      <FlatButton onClick={() => onFilter(true)} label="done" secondary={filter.done === true} />
    </Badge>
  </div>
)

export default TodoFilter
