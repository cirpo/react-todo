import React from 'react'

let TodoFilter = ({todos, filter, onFilter}) => (
    <div>
        <span className="mdl-badge mdl-badge--overlap" data-badge={todos.length}
          onClick={() => onFilter(undefined)}>
          <button className={'mdl-button mdl-js-button' + (filter.done === undefined ? ' mdl-button--accent' : '')}>
          ALL
          </button>
        </span>
        <span className="mdl-badge mdl-badge--overlap" data-badge={todos.filter((todo) => !todo.done).length }
          onClick={() => onFilter(false)}>
          <button className={'mdl-button mdl-js-button' + (filter.done === false ? ' mdl-button--accent' : '')}>
          ACTIVE
          </button>
        </span>
        <span className="mdl-badge mdl-badge--overlap" data-badge={todos.filter((todo) => todo.done).length}
          onClick={() => onFilter(true)}>
          <button className={'mdl-button mdl-js-button' + (filter.done === true ? ' mdl-button--accent' : '')}>
          DONE
          </button>
        </span>
    </div>
)

export default TodoFilter
