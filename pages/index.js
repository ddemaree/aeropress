import Head from 'next/head'
import { Container, Editor, Toolbar } from 'react-mobiledoc-editor'

const isBrowser = () => (!!(typeof window !== 'undefined'))

const getEditorBlock = ({ onChange }) => {
  // if(isServer())
  //   return <div className="ap-editor-placeholder" />

  return <Container className="ap-editor">
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
      {isBrowser() && getEditorBlock()}
    </div>
  </>
}

export default HomePage