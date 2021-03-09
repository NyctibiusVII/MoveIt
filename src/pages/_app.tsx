import { Sidebar } from '../components/Sidebar'
import { SidebarProvider } from "../contexts/SidebarContext"

import '../styles/global.css'

function MyApp({ Component, pageProps}) {
  return (
    <>
      <SidebarProvider>
        <Component {...pageProps} />
        <Sidebar/>
      </SidebarProvider>
    </>
  )
}
export default MyApp