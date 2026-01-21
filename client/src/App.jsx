import { useEffect, useState } from 'react'
import axios from 'axios'
import ToDo from './components/ToDo'
import { baseURL } from "./utils/constant"
import Popup from './components/Popup'

const App = () => {

  const [toDos, setToDos] = useState([])
  const [input, setInput] = useState("")
  const [updateUI, setUpdateUI] = useState(false)
  const [popupContent, setPopupContent] = useState({})
  const [showPopup, setShowPopup] = useState(false) // ✅ FIX

  useEffect(() => {
    axios.get(`${baseURL}/get`)
      .then(res => setToDos(res.data))
      .catch(err => console.log(err))
  }, [updateUI])

  const saveToDo = () => {
    if (!input.trim()) return

    axios.post(`${baseURL}/save`, { toDo: input })
      .then(() => {
        setUpdateUI(prev => !prev)
        setInput("")
      })
      .catch(err => console.log(err))
  }

  return (
    <main>
      <div className="container">
        <h1 className="title">Todo App</h1>

        <div className="input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a Todo..."
          />
          <button onClick={saveToDo}>Add</button>
        </div>

        <div className="list">
          {
            toDos.map(el => (
              <ToDo
                key={el._id}
                id={el._id}
                text={el.toDo}
                setUpdateUI={setUpdateUI}
                setShowPopup={setShowPopup}
                setPopupContent={setPopupContent}
              />
            ))
          }
        </div>
      </div>

      {/* ✅ show popup conditionally */}
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  )
}

export default App
