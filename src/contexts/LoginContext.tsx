import { SidebarContext }    from './SidebarContext'
import { ToastContext }      from './ToastContext'

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
}                               from 'react'
import Router                   from 'next/router'
import axios, { AxiosResponse } from 'axios'
import Cookies                  from 'js-cookie'

interface LoginContextData {
    __id:         string
    __type:       string
    __name:       string
    __avatar_url: string
    __username:   string
    __isLogged:   number
    verifyUser:   () => void
    login:        () => void
    logout:       () => void
}
interface  LoginProviderProps {
    children:     ReactNode
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export const LoginContext = createContext({} as LoginContextData)

const date = new Date

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
    const { goHome, goSettings } = useContext(SidebarContext)
    const { toastON }            = useContext(ToastContext)

    const avatarsGithubURL = 'https://avatars.githubusercontent.com/u/'
    const [selectImage, setSelectImage] = useState(0) // - Padrão
    const stockImagePatterns = [
        /* 0 */  '28929274', // - Rocketseat
        /* 1 */  '66792792', // - Omni
        /* 2 */  '9919',     // - Github
        /* 3 */  '1342004',  // - Google
        /* 4 */  '8683385',  // - Curso em Vídeo
        /* 5 */  '52816125', // - Creator
        /* 6 */  '6643122',  // - Mayk Brito
        /* 7 */  '2254731',  // - Diego Fernandes
        /* 8 */  '13246927', // - Thaissa Candella
        /* 9 */  '19231904', // - Gabriel Froes
        /* 10 */ '4248081',  // - Filipe Deschamps
        /* 11 */ '2840',     // - Fabio Akita
        /* 12 */ '66076428', // - Gustavo Guanabara
        /* 13 */ '11791361', // - Undefined
    ]

    const getImageCache = () => `${avatarsGithubURL}${stockImagePatterns[selectImage]}?v=4`
    const getUserCache  = () => `User${date.getHours()}${Number(date.getUTCMonth())+1}${date.getUTCFullYear()}`

    const quickImage    = String(rest.__avatar_url) === 'undefined' ? getImageCache() : String(rest.__avatar_url)
    const quickUsername = String(rest.__username)   === 'undefined' ? getUserCache()  : String(rest.__username)
    const quickLogin    = String(rest.__isLogged)   === 'undefined' ? 0               : Number(rest.__isLogged) // DESC: !__isLogged ? 0 : 1

    const [__id,         setId]         = useState(null)
    const [__type,       setType]       = useState(null)
    const [__name,       setName]       = useState(null)
    const [__avatar_url, setAvatar_url] = useState(quickImage)
    const [__username,   setUsername]   = useState(quickUsername)
    const [__isLogged,   setIsLogged]   = useState(quickLogin)

   /**
    *   console.info(`
    *       Id       : ${__id}
    *       Type     : ${__type}
    *       Name     : ${__name}
    *       Image    : ${__avatar_url}
    *       Username : ${__username}
    *       Logged   : ${__isLogged}
    *   `) // - Look info
    */

    useEffect(() => {
        Cookies.set('__avatar_url', String(__avatar_url))
        Cookies.set('__username',   String(__username))
        Cookies.set('__isLogged',   String(__isLogged))
    }, [ __avatar_url, __username, __isLogged ])


    function verifyUser() {
        const quickInputUsername = Cookies.get('usernameCacheForValidation')

        axios
            .get(`https://api.github.com/users/${quickInputUsername}`)
            .then(resp => {
                if (resp.data.type === 'User') {
                    // - User exists
                    console.info(`Access allowed: Welcome to MoveIt ${resp.data.login} 🥳`)
                    toastSuccess()

                    /* ------- */    getInfoUser(resp)
                    /* ------- */    login()
                } else {
                    // - Organization
                    console.warn('Access denied: You cannot enter an organization name!\nOnly users are allowed')
                    toastWarn()
                }
            })
            .catch(err => {
                // - User does not exist
                console.error(err+'\n\nUser does not exist')
                toastError()
            })
    }
    function getInfoUser(resp: AxiosResponse<any>) {
        setId         (resp.data.id)
        setType       (resp.data.type)
        setName       (resp.data.name)
        setAvatar_url (resp.data.avatar_url)
        setUsername   (resp.data.login)

       /**
        *   console.info(`
        *       Id       : ${resp.data.id}
        *       Type     : ${resp.data.type}
        *       Name     : ${resp.data.name}
        *       Image    : ${resp.data.avatar_url}
        *       Username : ${resp.data.login}
        *   `) // - Look info
        */
    }
    function login() { // - Basic Login
        setIsLogged(1)

        goHome()
        Router.push('/')
    }
    function logout() {
        // - Logged out user
        console.info(`Session ended successfully: See you later ${__username} 💙`)
        toastLogout()

        Cookies.set('usernameCacheForToast', String(__username))

        setId         (null)
        setType       (null)
        setName       (null)
        setAvatar_url (getImageCache())
        setUsername   (getUserCache())
        setIsLogged   (0)

        //reload()

        setTimeout(() => {
            const usernameCacheForToast = Cookies.get('__username')
            Cookies.set('usernameCacheForToast', String(usernameCacheForToast))
        }, Number(process.env.TOAST_BAR_COUNTDOWN)*1000)
    }

    function toastSuccess() {
        Cookies.set('whichToast', '0')
        toastON()
    }
    function toastWarn() {
        Cookies.set('whichToast', '1')
        toastON()
    }
    function toastError() {
        Cookies.set('whichToast', '2')
        toastON()
    }
    function toastLogout() {
        Cookies.set('whichToast', '3')
        toastON()
    }

    const reload = () => setTimeout(() => { Router.reload(), goSettings() }, 0)

    return (
        <LoginContext.Provider
            value={{
                __id,
                __type,
                __name,
                __avatar_url,
                __username,
                __isLogged,
                verifyUser,
                login,
                logout
            }}
        >
            { children }
        </LoginContext.Provider>
    )
}