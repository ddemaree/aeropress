import '../styles/global.css'

import Head from 'next/head'
import { AuthProvider } from '../components/auth-provider'

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
}