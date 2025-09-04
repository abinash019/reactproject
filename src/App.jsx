import { useState } from 'react'

import './App.css'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [input, setInput] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    // setList(list => [...list, input]);
    if (!input.trim()) return;
    setList([...list, { id: Date.now(), text: input }])
    setInput("");
  }

  function handleDelete(id) {
    setList(list.filter(list => list.id != id))

  }

  return (
    <>
      <div>

      </div>
      <h1>Counter App</h1>
      <div className="card">
        <p>{count}</p>
        <button onClick={() => setCount((count) => count + 1)}>
          click
        </button>
        <button className='delete-btn' onClick={() => setCount(() => 0)}>reset</button>

      </div>
      <p className="read-the-docs">
        Click on the button for count
      </p>


      <form onSubmit={handleSubmit}>
        <input className='input' placeholder='Enter your Title' value={input} onChange={(e) => setInput(e.target.value)} />
        <button className='delete-btn' type="submit">Add</button>
        <p>{input}</p>

      </form>

      {list.length == 0 ? <p>No Item Added yet</p>
        :
        <TodoList items={list} onDelete={handleDelete} />
      }


      {/*
        list.length == 0 ? <p>No Item Added yet</p> : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>

              {list.map((item, index) => (

                <tr key={item.id}>
                  <td>{new Date(item.id).toLocaleString()}</td>
                  <td>{item.text}</td>

                </tr>))}
            </tbody>
          </table >
              )*/}


    </>
  )
}

export default App
