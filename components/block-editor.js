
// import { Container, Editor, Toolbar } from 'react-mobiledoc-editor'
import { createContext, useState, useEffect, useRef, useContext } from 'react'
import * as MDK from 'mobiledoc-kit'

const LATEST_MOBILEDOC_VERSION = "0.3.1"
const SIMPLE_MOBILEDOC = {
  version: LATEST_MOBILEDOC_VERSION,
  markups: [],
  atoms: [],
  cards: [],
  sections: [
    [1, "h1", [
      [0, [], 0, "Welcome to Mobiledoc"]
    ]]
  ]
};

const isBrowser = () => (!!(typeof window !== 'undefined'))

const EditorContext = createContext({})

const EditorInput = props => {
  const editorElemRef = useRef(null)
  const renderedRef = useRef(false)
  const { editor } = useContext(EditorContext)

  useEffect(() => {
    if(editor && !renderedRef.current) {
      editor.render(editorElemRef.current)
      renderedRef.current = true
    }
  })

  return <div ref={editorElemRef} className="ap-editor-box ap-text-content max-w-3xl mx-auto" />
}

const EditorBlock = ({ onChange }) => {
  const editorRef = useRef(null)
  const [editor, setEditor] = useState(null)
  const [activeState, setActiveState] = useState({
    activeSectionAttributes: [],
    activeMarkupTags: [],
    activeSectionTags: []
  })

  const setActiveTags = () => {
    const newEditor = editorRef.current
    if(!newEditor) return null

    const activeSectionAttributes = newEditor.activeSections.map(s => {
      return s.attributes || {};
    })
    const activeMarkupTags = newEditor.activeMarkups.map(m => m.tagName)
    // newEditor.activeSections are leaf sections.
    // Map parent section tag names (e.g. 'p', 'ul', 'ol') so that list buttons
    // are updated.
    const activeSectionTags = newEditor.activeSections.map(s => {
      return s.isNested ? s.parent.tagName : s.tagName;
    })

    console.log("Setting active tags", {activeSectionAttributes, activeMarkupTags, activeSectionTags})
    setActiveState({activeSectionAttributes, activeMarkupTags, activeSectionTags})
  }

  useEffect(() => {
    console.log("Initializing editor")
    const newEditor = new MDK.Editor({
      mobiledoc: SIMPLE_MOBILEDOC,
      placeholder: "Just bring words",
      autofocus: true
    })
    newEditor.postDidChange(() => {
      const mobiledoc = newEditor.serialize(LATEST_MOBILEDOC_VERSION);
      console.log(mobiledoc)
    });
    newEditor.inputModeDidChange(() => {
      console.log("HI")
    })

    editorRef.current = newEditor
    setEditor(editorRef.current)

    return () => newEditor.destroy()
  }, [])

  return <>
    <EditorContext.Provider value={{
      editor,
      hello: 'world',
      ...activeState
    }}>
      <EditorInput />
    </EditorContext.Provider>
  </>
}

export default EditorBlock