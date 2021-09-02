/* Import ---------------------------------------------------------------------- */ // - x70

import { SidebarContext } from './SidebarContext'

import {
    createContext,
    ReactNode,
    useContext
} from 'react'

import { api } from '../services/api'

import { User }                                   from '../interface/user'
import { CookiesType, ISLOGGED, COOKIES_CONSENT } from '../interface/cookiesType'

import Cookies from 'js-cookie'

import Router from 'next/router'

/* ---------------------------------------------------------------------- */

interface CookieConsentContextData {
    iAgree: () => void
}
interface  CookieConsentProviderProps {
    children: ReactNode
}

export const CookieConsentContext = createContext({} as CookieConsentContextData)

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
    const { goHome, goLeaderbord, goSettings } = useContext(SidebarContext)

    //const quickCC = (Cookies.get('cookieConsent') ?? COOKIES_CONSENT.__false) === COOKIES_CONSENT.__false ? Number(COOKIES_CONSENT.__false) : Number(Cookies.get('cookieConsent'))

    function iAgree() {
        const __ISLOGGED: boolean = Cookies.get('__isLogged') === ISLOGGED.__true

        const setDb_newValue = async () => {
            const username = Cookies.get(CookiesType.__username)

            await api
            .get(`/users/${username}`, {
                validateStatus: (status: number): boolean => status < 500 // - Resolve only if the status code is less than 500
            })
            .then(async resp => {
                if (Number(resp.request.status) === 200) {
                    const
                        data: User= resp.data,
                        updateUser: User = {
                            github_id:  data.github_id,
                            avatar_url: data.avatar_url,
                            username:   data.username,
                            name:       data.name,
                            email:      data.email,
                            type:       data.type,
                            level:                data.level,
                            current_experience:   data.current_experience,
                            challenges_completed: data.challenges_completed,
                            theme:          data.theme,
                            cookie_consent: Number(COOKIES_CONSENT.__true) // - Alterado
                        }

                        await api
                            .put(`/users/${username}`, updateUser)
                            .catch(e => { throw e })
                }
                else { console.error(process.env.ERROR_GET) }
            })
            .catch(e => { throw e })
        }
        const setCookies_newValue = () => {
            Cookies.set('cookieConsent', COOKIES_CONSENT.__true)
        }

        const setCookieConsent_newValue = () => {
            if(__ISLOGGED) {
                setDb_newValue()
                setCookies_newValue()
            } else setCookies_newValue()
        }

        Promise.all([ setCookieConsent_newValue() ]).then(() => reload())
    }

    const reload = () => {
        setTimeout(() => {
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
        }, 0)
    }

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