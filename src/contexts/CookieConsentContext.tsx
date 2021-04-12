import { SidebarContext } from './SidebarContext'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
}              from 'react'
import Router  from 'next/router'
import Cookies from 'js-cookie'

interface CookieConsentContextData {
    iAgree: () => void
}
interface  CookieConsentProviderProps {
    children: ReactNode
}

export const CookieConsentContext = createContext({} as CookieConsentContextData)

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
    const { goHome, goLeaderbord, goSettings } = useContext(SidebarContext)

    const quickCC = (Cookies.get('cookieConsent') ?? '0') === '0' ? 0 : Number(Cookies.get('cookieConsent')) // DESC: !cookieConsent ? 0 : 1

    const [ cookieConsent, setCookieConsent ] = useState(quickCC)

   /**
    *   console.info(`
    *       Cookie consent : ${cookieConsent}
    *   `) // - Look info
    */

    useEffect(() => {
        Cookies.set('cookieConsent', String(cookieConsent))
    }, [ cookieConsent ])

    function iAgree() {
        setCookieConsent(1)

        reload()
    }

    const reload = () => {setTimeout(() => {
        Router.reload()

        const page = Cookies.get('activePage')
        switch (page) {
            case 'home':
                goHome()
                console.log('home')
                break;
            case 'leaderbord':
                goLeaderbord()
                console.log('leaderbord')
                break;
            case 'settings':
                goSettings()
                console.log('settings')
                break;

            default:
                break;
        }
    }, 0) }

    return (
        <CookieConsentContext.Provider
            value={{
                iAgree
            }}
        >
            { children }
        </CookieConsentContext.Provider>
    )
}