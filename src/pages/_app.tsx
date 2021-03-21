import { Test }                 from '../components/Test'
import { Sidebar }              from '../components/Sidebar'
import { FloatingActionButton } from '../components/FloatingActionButton'

import { SidebarProvider } from '../contexts/SidebarContext'

import '../styles/global.css'

export default function MyApp({ Component, pageProps}) {
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