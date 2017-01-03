import React from 'react'
import TodoForm from './TodoForm'
import renderer from 'react-test-renderer'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { mount } from 'enzyme'

test('Link changes the class when hovered', () => {
  const mountWithContext = (node) => mount(node, {
    context: {
      muiTheme: getMuiTheme(),
    },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    }
  })
  const component = renderer.create(
    <TodoForm todos={[{"title": 'lol', "done": false}]} createTodo={() => {console.log('ciao')}} />
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
