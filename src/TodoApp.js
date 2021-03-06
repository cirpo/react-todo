import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoFilter from './TodoFilter'
import todoBrowserApi from './todoBrowserApi'
import withTodo from './Todo'

let Todos = ({todos, createTodo, toggleTodo, filter, onFilter}) => (
  <div className="container">
    <TodoForm createTodo={createTodo} />
    <TodoFilter todos={todos} filter={filter} onFilter={onFilter}/>
    <TodoList todos={todos} filter={filter} toggleTodo={toggleTodo} />
  </div>
)

Todos = withTodo(Todos, todoBrowserApi)

window.todos = {
  add: todoBrowserApi.add.bind(todoBrowserApi)
}

export default Todos
