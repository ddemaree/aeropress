import Head from 'next/head'
import { Container, Editor, Toolbar } from 'react-mobiledoc-editor'

const HomePage = () => {
  return <>
    <Head>
      <title>David's project</title>
    </Head>
    <div>
      <h1>I'm on Next JS!!!!!!</h1>
      <Container>
        <Editor />
      </Container>
    </div>
  </>
}

export default HomePage