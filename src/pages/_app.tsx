import { Sidebar } from '../components/Sidebar'
import { SidebarProvider } from "../contexts/SidebarContext"
import { FloatingActionButton } from '../components/FloatingActionButton'

import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SidebarProvider>
        <Component {...pageProps} />
        <Sidebar />
        <FloatingActionButton />
      </SidebarProvider>
    </>
  )
}
export default MyApp