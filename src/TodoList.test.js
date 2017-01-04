import React from 'react'
import TodoList from './TodoList'
import { shallow } from 'enzyme'

const todos = [{'title': 'update CV', 'done': false}, {'title': 'check calendar', 'done': true}]
const toggleTodo = jest.fn()

describe('<TodoList />', () => {
  it('should render the TodoList component, with all the todos', () => {
    const filter = {'done' : undefined}
    const wrapper = shallow(
      <TodoList todos={todos} toggleTodo={toggleTodo} filter={filter}/>
    )

    expect(wrapper.find('ListItem').length).toBe(2)
  })

  it('should render the TodoList component, with the active todos', () => {
    const filter = { 'done' : false}
    const wrapper = shallow(
      <TodoList todos={todos} toggleTodo={toggleTodo} filter={filter}/>
    )

    expect(wrapper.find('ListItem').length).toBe(1)
  })

  it('should render the TodoList component, with the done todos', () => {
    const filter = {'done' : true}
    const wrapper = shallow(
      <TodoList todos={todos} toggleTodo={toggleTodo} filter={filter}/>
    )

    expect(wrapper.find('ListItem').length).toBe(1)
  })

  it('should render the TodoList component, with the done todos after an active todo is marked done', () => {
    const filter = {'done': undefined}
    const wrapper = shallow(
      <TodoList todos={todos} toggleTodo={toggleTodo} filter={filter}/>
    )

    expect(wrapper.find('ListItem').length).toBe(2)

    wrapper.find('ListItem').first().simulate('click')
    expect(toggleTodo).toBeCalledWith({'title': todos[0].title, 'done': false})
  })

})
