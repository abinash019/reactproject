import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ items, onDelete }) => {
  return (
    <ul>{items.map(item => (
      <TodoItem key={item.id} item={item} onDelete={onDelete} />))
    }</ul>

  )
}

export default TodoList