import Head from 'next/head'
import { Container, Editor, Toolbar } from 'react-mobiledoc-editor'

const EditorBlock = ({ onChange }) => {
  if(typeof window === 'undefined') return null;

  return <Container onChange={onChange} className="ap-editor">
    <Toolbar />
    <Editor />
  </Container>
}

const HomePage = () => {
  return <>
    <Head>
      <title>David's project</title>
    </Head>
    <div>
      <h1>Editor Test</h1>
      <EditorBlock />
    </div>
  </>
}

export default HomePage