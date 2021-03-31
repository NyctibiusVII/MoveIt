import { ChallengesContext } from './ChallengesContexts'
import { SidebarContext }    from './SidebarContext'

import { DangerZoneModal } from '../components/DangerZoneModal'

import {
    createContext,
    useContext,
    useState,
    ReactNode
}              from 'react'

import Router  from 'next/router'
import Cookies from 'js-cookie'

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
    const { goSettings }          = useContext(SidebarContext)

    const [ textMain,    setTextMain ]    = useState(null)
    const [ textButton,  setTextButton ]  = useState(null)

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
        resetCookiesDataLCC()

        Cookies.remove('__avatar_url')
        Cookies.remove('__isLogged')
        Cookies.remove('__username')

        Cookies.remove('activePage')
        Cookies.remove('usernameCacheForValidation')

        console.info('Cookies Deletados ✅')

        reload()
    }
    function deleteDataBase() {
        console.info('Dados Deletados ✅')

        reload()
    }

    const reload = () => {
        closeDangerZoneModal()
        Router.reload()
        goSettings()
    }

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