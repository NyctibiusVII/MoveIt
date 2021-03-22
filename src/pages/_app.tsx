import { Test }                 from '../components/Test'
import { Toast }                from '../components/Toast'
import { Sidebar }              from '../components/Sidebar'
import { FloatingActionButton } from '../components/FloatingActionButton'

import { ToastProvider }   from '../contexts/ToastContext'
import { SidebarProvider } from '../contexts/SidebarContext'

import '../styles/global.css'

export default function MyApp({ Component, pageProps}) {
    return (
        <>
            <SidebarProvider>
                <ToastProvider>
                    <Component {...pageProps} />
                    <Toast />
                    <Sidebar />
                    <FloatingActionButton />
                </ToastProvider>
            </SidebarProvider>
        </>
    )
}