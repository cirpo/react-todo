
window.todos = {

    todos: [],

    subscribe(onChange) {
        this.onChange = onChange
    },

    unsubscribe() {
        this.onChange = null
    },

    add(todo) {
        this.todos.push(todo)
        this.onChange && this.onChange(this.todos)
    }

}

const withTodos = Component => (
    class extends React.Component {

        constructor(){
            super();

            this.state = { todos: [] }

            this.onChange = this.onChange.bind(this)
        }

        componentDidMount() {
            todos.subscribe(this.onChange)
        }

        componentWillUnmount() {
            todos.unsubscribe()
        }

        onChange(todos) {
            this.setState({ todos })
        }

        render() {
            return <Component todos={this.state.todos} />
        }
    }
)

let Todos = ({ todos }) => (
    <ul>
        {todos.map((todo, i) => (
            <li key={i}>{todo.title}</li>
        ))}
    </ul>
)

Todos = withTodos(Todos)

const Main = () => <Todos />
