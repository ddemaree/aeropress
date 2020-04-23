import { useRef, useEffect, useState, useReducer, Fragment } from 'react'
import c from 'classnames'

import BlockEditor from '../../../components/block-editor'
import ExpandoTextArea from '../../../components/expando-field'

const EditView = () => {
  const rootReducer = (state, action) => {
    switch(action.type){
     case 'update_title':
       const { title } = action
       return { ...state, title };
     case 'update_mobiledoc_source':
       const { mobiledoc } = action
       return { ...state, source: { format: 'mobiledoc', mobiledoc } }
     default:
       return state;
    }
  }
  
  const defaultState = {title: '', source: {}}
  
  const [postData, dispatch] = useReducer((state, action) => {
    console.log(`Dispatched ${action.type}`, action, state)
    const newState = rootReducer(state, action)
    console.log(`Done - ${action.type}`, newState)
    return newState
  }, defaultState)
  
  return <div className="max-w-3xl mx-auto">
    <h1>Edit post</h1>
    <ExpandoTextArea 
      placeholder="Add title"
      value={postData.title}
      onChange={title => dispatch({type: 'update_title', title})} />
    
    <div>
      <BlockEditor onChange={mobiledoc => dispatch({type: 'update_mobiledoc_source', mobiledoc})} />
    </div>
    
  </div>
}

export default EditView