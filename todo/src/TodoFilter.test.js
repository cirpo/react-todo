import React from 'react'
import TodoFilter from './TodoFilter'
import renderer from 'react-test-renderer'

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <TodoFilter todos={[{"title": 'lol', "done": false}]} filter={{"done": undefined}} />
  );

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onMouseEnter()
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onMouseLeave()
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
