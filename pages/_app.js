import '../styles/global.css'

import { AuthProvider } from '../components/auth-provider'

export default function MyApp({ Component, pageProps }) {
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}