/* Import ---------------------------------------------------------------------- */ // - x70

import {
    createContext,
    ReactNode,
    useState
} from 'react'

import Cookies from 'js-cookie'

/* ---------------------------------------------------------------------- */

interface SidebarContextData {
    activePage:   String
    goHome:       () => void
    goLeaderbord: () => void
    goSettings:   () => void
    goLogin:      () => void
}
interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [activePage, setActivePage] = useState(Cookies.get('activePage') ?? 'home') // - Padrão

    function goHome() {
        sidebarON()
        setActivePage('home')
        Cookies.set('activePage', 'home')
    }
    function goLeaderbord() {
        sidebarON()
        setActivePage('leaderbord')
        Cookies.set('activePage', 'leaderbord')
    }
    function goSettings() {
        sidebarON()
        setActivePage('settings')
        Cookies.set('activePage', 'settings')
    }
    function goLogin() {
        sidebarOFF()
        setActivePage('login')
        Cookies.set('activePage', 'login')
    }

    const sidebarON  = () => Cookies.set('sidebar&FAB', 'enable')
    const sidebarOFF = () => Cookies.set('sidebar&FAB', 'disabled')

    return(
        <SidebarContext.Provider value={{
            activePage,
            goHome,
            goLeaderbord,
            goSettings,
            goLogin
        }}>
            {children}
        </SidebarContext.Provider>
    )
}