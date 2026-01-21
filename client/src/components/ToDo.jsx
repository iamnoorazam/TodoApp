import axios from 'axios'
import { RiEditFill } from "react-icons/ri"
import { RxCross1 } from "react-icons/rx"
import { baseURL } from "../utils/constant"

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {

  const deleteToDo = () => {
    axios.delete(`${baseURL}/delete/${id}`)
      .then(() => setUpdateUI(prev => !prev))
      .catch(err => console.log(err))
  }

  const updateToDo = () => {
    setPopupContent({ id, text }) // ✅ pass data
    setShowPopup(true)            // ✅ open popup
  }

  return (
    <div className="toDo">
      <span>{text}</span>
      <div className="icons">
        <RiEditFill className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteToDo} />
      </div>
    </div>
  )
}

export default ToDo
