import React from 'react'
import TodoForm from './TodoForm'
import { shallow } from 'enzyme'
import {mount} from 'enzyme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()


describe('<TodoForm />', () => {
  it('should render TodoForm component', () => {
    let createTodo = () => {}
    const wrapper = shallow(
      <TodoForm createTodo = {createTodo} />
    )

    expect(wrapper.find('TextField').length).toBe(1)
    expect(wrapper.find('FloatingActionButton').length).toBe(1)
    expect(wrapper.find('ContentAdd').length).toBe(1)
  })

  it('should have "What\'s next?" as a hint text"', () => {
    let createTodo = jest.fn()
    const wrapper = shallow(
      <TodoForm createTodo = {createTodo} />
    )
    expect(wrapper.find('TextField').prop('hintText')).toBe("What's next?")
  })

  it('should have an empty string as a default value', () => {
    let createTodo = jest.fn()
    const wrapper = shallow(
      <TodoForm createTodo = {createTodo} />
    )
    expect(wrapper.find('TextField').props().value).toBe('')
  })

  it('should pass the input value to the createTodo function', () => {
    const createTodo = jest.fn()
    const newTodo = 'buy milk!'

    const wrapper = mount(
      <MuiThemeProvider>
        <TodoForm createTodo = {createTodo} />
      </MuiThemeProvider>
    )
    const form = wrapper.find('form')
    const input = wrapper.find('input')

    input.simulate('change', {target: {value: newTodo}});

    expect(wrapper.find('TextField').prop('value')).toBe('buy milk!')

    input.simulate('submit')
    expect(createTodo).toBeCalledWith({'title': newTodo, 'done': false});
  })
})
