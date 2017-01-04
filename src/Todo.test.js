import React from 'react'
import { shallow} from 'enzyme'
import Todo from './Todo'

const todoBrowserApi = () => {}
const TodoList = () => <div />

test('passes the props to the component', () => {
  const TodoListWithTodo = Todo(TodoList, todoBrowserApi)

  const wrapper = shallow(<TodoListWithTodo />)
  console.log(wrapper.debug())

  expect(wrapper.prop('todos')).toEqual([])
  expect(wrapper.prop('filter')).toEqual({})
})
