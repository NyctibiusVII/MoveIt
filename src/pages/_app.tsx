/* Import ---------------------------------------------------------------------- */ // - x70

/** 1/3
 *  import App from 'next/app'
 *  import type { AppProps, AppContext } from 'next/app'
 */
import type { AppProps } from 'next/app'

import { CookieConsentModal }   from '../components/CookieConsentModal'
import { FloatingActionButton } from '../components/FloatingActionButton'
import { Sidebar }              from '../components/Sidebar'
// import { Test }                 from '../components/Test'
import { Toast }                from '../components/Toast'

import { AppearanceProvider }    from '../contexts/AppearanceContext'
import { CookieConsentProvider } from '../contexts/CookieConsentContext'
import { SidebarProvider }       from '../contexts/SidebarContext'
import { ToastProvider }         from '../contexts/ToastContext'

import Head from 'next/head'

import '../styles/global.css'

/* ---------------------------------------------------------------------- */

export default function MyApp({ Component, pageProps }: AppProps) {
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



/** 2/3
 *  Only uncomment this method if you have blocking data requirements for
 *  every single page in your application. This disables the ability to
 *  perform automatic static optimization, causing every page in your app to
 *  be server-side rendered.
 */

/** 3/3
 *  MyApp.getInitialProps = async (appContext: AppContext) => {
 *    // calls page's `getInitialProps` and fills `appProps.pageProps`
 *    const appProps = await App.getInitialProps(appContext)
 *
 *    return { ...appProps }
 *  }
 */