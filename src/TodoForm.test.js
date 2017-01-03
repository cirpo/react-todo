import React from 'react'
import TodoForm from './TodoForm'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('<TodoForm />', () => {
  it('should render  <TodoForm /> components', () => {
    let createTodo = jest.fn()
    const wrapper = shallow(
    <TodoForm
      createTodo = {createTodo}
    />
    )

    console.log(wrapper.debug())
  })
})
