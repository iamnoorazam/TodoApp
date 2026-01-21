import { useState, useEffect } from 'react'
import axios from 'axios'
import { RxCross1 } from "react-icons/rx"
import { baseURL } from "../utils/constant"

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {

  const [input, setInput] = useState("")

  // preload existing todo
  useEffect(() => {
    setInput(popupContent.text)
  }, [popupContent])

  const updateTodo = () => {
    axios.put(`${baseURL}/update/${popupContent.id}`, {
      toDo: input
    })
      .then(() => {
        setUpdateUI(prev => !prev)
        setShowPopup(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="backdrop">
      <div className="popup">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <h1>Update Todo</h1>

        <div className="popup__input_holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update Todo..."
          />
          <button onClick={updateTodo}>Update</button>
        </div>
      </div>
    </div>
  )
}

export default Popup
