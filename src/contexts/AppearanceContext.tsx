/* Import ---------------------------------------------------------------------- */ // - x70

import {
    createContext,
    ReactNode,
    useEffect,
    useState
} from 'react'

import Cookies from 'js-cookie'

/* ---------------------------------------------------------------------- */

interface AppearanceContextData {
    changeLight:  () => void
    changeDark:   () => void
    changeCustom: () => void
}
interface AppearanceProviderProps {
    children: ReactNode
}

export const AppearanceContext = createContext({} as AppearanceContextData)

export function AppearanceProvider({ children }: AppearanceProviderProps) {
    const [ activeTheme, setActiveTheme ] = useState(Cookies.get('activeTheme') ?? 'light') // - Padrão

    useEffect(() => {
        Cookies.set('activeTheme', activeTheme)
    }, [ activeTheme ])

    function changeLight() {
        Cookies.set('activeTheme', 'light')
        setActiveTheme('light')
    }
    function changeDark() {
        Cookies.set('activeTheme', 'dark')
        setActiveTheme('dark')

        developing()
    }
    function changeCustom() {
        Cookies.set('activeTheme', 'custom')
        setActiveTheme('custom')

        developing()
    }

    function developing() {
        setTimeout(() => {
            console.info('Desculpe, mas este recurso ainda esta em desenvolvimento.')

            Cookies.set('activeTheme', 'light')
            setActiveTheme('light')
        }, 1000)
    }

    return (
        <AppearanceContext.Provider
            value={{
                changeLight,
                changeDark,
                changeCustom
            }}
        >
            { children }
        </AppearanceContext.Provider>
    )
}