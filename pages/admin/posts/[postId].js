import { useRef } from 'react'

const ExpandoTextArea = ({ value, placeholder, className, onChange }) => {
  const textareaRef = useRef()

  return <div style="overflow: hidden; overflow-wrap: break-word; resize: none;"></div>
}


const EditView = () => {
  return <div>Edit post</div>
}

export default EditView