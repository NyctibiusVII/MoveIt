import { Test }                 from '../components/Test'
import { Toast }                from '../components/Toast'
import { Sidebar }              from '../components/Sidebar'
import { FloatingActionButton } from '../components/FloatingActionButton'

import { AppearanceProvider } from '../contexts/AppearanceContext'
import { ToastProvider }      from '../contexts/ToastContext'
import { SidebarProvider }    from '../contexts/SidebarContext'

import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <AppearanceProvider>
                <SidebarProvider>
                    <ToastProvider>
                        <Component {...pageProps} />
                        <Toast />
                        <Sidebar />
                        <FloatingActionButton />
                    </ToastProvider>
                </SidebarProvider>
            </AppearanceProvider>
        </>
    )
}