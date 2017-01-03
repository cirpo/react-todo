import React from 'react'
import TodoFilter from './TodoFilter'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('<TodoFilter />', () => {
  it('should render  <TodoFilter /> components', () => {
    let onFilter = jest.fn()
    const wrapper = shallow(
    <TodoFilter
      todos={[{'title': 'do it', 'done': false}]}
      filter={{'done': undefined}}
      onFilter={onFilter}
    />
    )

    console.log(wrapper.debug())
    expect(wrapper.text()).toBe('<Badge /><Badge /><Badge />')

    console.log(wrapper.find('Badge').last().props().debug())
    wrapper.find('FlatButton').last().simulate('click')
    expect(onFilter).toBeCalled()
    console.log(wrapper.debug())
  })
})
