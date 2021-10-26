/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from './ChallengesContexts'
import { SidebarContext }    from './SidebarContext'

import { DangerZoneModal } from '../components/DangerZoneModal'

import {
    createContext,
    ReactNode,
    useContext,
    useState
} from 'react'
import { useTheme } from 'next-themes'

import { api } from '../services/api'

import { CookiesType } from '../interface/cookiesType'

import Cookies from 'js-cookie'

import Router from 'next/router'

/* ---------------------------------------------------------------------- */

interface DangerZoneContextData {
    textMain:             string
    textButton:           string
    openDangerZoneModal:  () => void
    closeDangerZoneModal: () => void
    deleteCookiesData:    () => void
    deleteDataBase:       () => void
}
interface DangerZoneProviderProps {
    children: ReactNode
}

export const DangerZoneContext = createContext({} as DangerZoneContextData)

export function DangerZoneProvider({ children }: DangerZoneProviderProps) {
    const { resetCookiesDataLCC } = useContext(ChallengesContext)
    const { goSettings          } = useContext(SidebarContext)
    const { theme,   setTheme   } = useTheme()

    const [ textMain,    setTextMain   ] = useState(null)
    const [ textButton,  setTextButton ] = useState(null)

    const [ isDangerZoneModalOpen, setIsDangerZoneModalOpen ] = useState(false)

    function openDangerZoneModal() {
        setIsDangerZoneModalOpen(true)
    }
    function closeDangerZoneModal() {
        setIsDangerZoneModalOpen(false)
        resetDangerZoneCookiesDataModel()
    }

    const resetDangerZoneCookiesDataModel = () => {
        Cookies.remove('whichDelete')

        setTextMain(null)
        setTextButton(null)
    }



    function deleteCookiesData() {
        cookieBaseDatas()

        Cookies.remove('activePage')
        setTheme('light')
        Cookies.remove('cookieConsent')

        console.info('Cookies Deletados ✔')

        reload()
    }
    async function deleteDataBase() {
        const username = Cookies.get(CookiesType.__username)

        await api
            .delete(`/users/${username}`)
            .then (() => cookieBaseDatas())
            .then (() => console.info ('Dados Deletados ✔'))
            .catch(() => console.error('Erro ao deletar dados ✖'))

        reload()
    }

    const cookieBaseDatas = () => {
        resetCookiesDataLCC()

        Cookies.remove('__avatar_url')
        Cookies.remove('__isLogged')
        Cookies.remove('__username')

        Cookies.remove('usernameCacheForValidation')
    }
    const reload = () => { closeDangerZoneModal(), setTimeout(() => { Router.reload(), goSettings() }, 0) }

    return (
        <DangerZoneContext.Provider
            value={{
                textMain,
                textButton,
                openDangerZoneModal,
                closeDangerZoneModal,
                deleteCookiesData,
                deleteDataBase
            }}
        >
            { children }
            { isDangerZoneModalOpen && <DangerZoneModal /> }
        </DangerZoneContext.Provider>
    )
}