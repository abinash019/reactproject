import React from 'react'

const TodoItem = ({ item, onDelete }) => {
  return (
    <li className='li'>
      {item.text}
      <button className='delete-btn' onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  )
}

export default TodoItem