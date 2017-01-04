import React from 'react'
import TodoFilter from './TodoFilter'
import { shallow } from 'enzyme'

describe('<TodoFilter />', () => {
  it('should render TodoFilter components with 3 Badges', () => {
    const todos = [{'title': 'update CV', 'done': false}, {'title': 'check calendar', 'done': true}]
    const filter = {'done': undefined}

    let onFilter = jest.fn()
    const wrapper = shallow(
      <TodoFilter
        todos={todos}
        filter={filter}
        onFilter={onFilter}
        />
    )

    expect(wrapper.text()).toBe('<Badge /><Badge /><Badge />')
    expect(wrapper.find('Badge').last().props().badgeContent).toBe(1)
    expect(wrapper.find('Badge').at(1).props().badgeContent).toBe(1)
    expect(wrapper.find('Badge').first().props().badgeContent).toBe(2)

    wrapper.find('FlatButton').last().simulate('click')
    expect(onFilter).toBeCalled()
  })
})
