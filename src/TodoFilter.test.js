import React from 'react'
import renderer from 'react-test-renderer'
import TodoFilter from './TodoFilter'

test('TodoFilter', () => {
  const component = renderer.create(
    <TodoFilter
      todos={[{'title': 'do it', 'done': false}]}
      filter={{'done': false}}
      onFilter={() => (console.log('pota'))}
    />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.onMouseEnter()
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()


  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
