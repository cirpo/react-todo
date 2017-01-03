import React from 'react'
import TodoFilter from './TodoFilter'
import { shallow } from 'enzyme'

describe('<TodoFilter />', () => {
  it('should render three <TodoFilter /> components', () => {
    const wrapper = shallow(
    <TodoFilter
      todos={[{'title': 'do it', 'done': false}]}
      filter={{'done': false}}
      onFilter={() => (console.log('pota'))}
    />
    )
    expect(wrapper.text()).toBe('<Badge /><Badge /><Badge />')
  })
})
