import { Test }                 from '../components/Test'
import { CookieConsentModal }   from '../components/CookieConsentModal'
import { Toast }                from '../components/Toast'
import { Sidebar }              from '../components/Sidebar'
import { FloatingActionButton } from '../components/FloatingActionButton'

import { AppearanceProvider }    from '../contexts/AppearanceContext'
import { CookieConsentProvider } from '../contexts/CookieConsentContext'
import { ToastProvider }         from '../contexts/ToastContext'
import { SidebarProvider }       from '../contexts/SidebarContext'

import Head from 'next/head'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <AppearanceProvider>
                <SidebarProvider>
                    <CookieConsentProvider>
                        <ToastProvider>
                            <Head>
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            </Head>
                            <Component {...pageProps} />
                            <CookieConsentModal />
                            <Toast />
                            <Sidebar />
                            <FloatingActionButton />
                        </ToastProvider>
                    </CookieConsentProvider>
                </SidebarProvider>
            </AppearanceProvider>
        </>
    )
}