import { createContext, useState, ReactNode, useEffect } from "react"

import Cookies from 'js-cookie'

interface SidebarContextData {
    activePage: String
    goHome: () => void
    goLeaderbord: () => void
    goSettings: () => void
}
interface SidebarProviderProps {
    children: ReactNode
}

export const SidebarContext = createContext({} as SidebarContextData)

export function SidebarProvider({ children }: SidebarProviderProps) {
    const [activePage, setActivePage] = useState('home') // - Padrão
    //console.log(Cookies.get('activePage'))

    function goHome() {
        setActivePage('home')
        Cookies.set('activePage', 'home')
    }
    function goLeaderbord() {
        setActivePage('leaderbord')
        Cookies.set('activePage', 'leaderbord')
    }
    function goSettings() {
        setActivePage('settings')
        Cookies.set('activePage', 'settings')
    }

    return(
        <SidebarContext.Provider value={{
            activePage,
            goHome,
            goLeaderbord,
            goSettings
        }}>
            {children}
        </SidebarContext.Provider>
    )
}