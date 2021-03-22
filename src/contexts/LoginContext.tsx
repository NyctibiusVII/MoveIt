import { ToastContext } from './ToastContext'

import { createContext, useState, ReactNode, useEffect, useContext } from 'react'
import axios, { AxiosResponse } from 'axios'

import Cookies from 'js-cookie'

interface LoginContextData {
    __id:         String
    __type:       String
    __name:       String
    __username:   String
    __avatar_url: String
    __isLogged:   Boolean
    verifyUser:   () => void
    login:        () => void
    logout:       () => void
}
interface  LoginProviderProps {
    children:     ReactNode
    __username:   String
    __avatar_url: String
    __isLogged:   Boolean
}

export const LoginContext = createContext({} as LoginContextData)

const date = new Date

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
    const { toastON } = useContext(ToastContext)

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

    const quickImage    = String (rest.__avatar_url) === 'undefined' ? getImageCache() : String (rest.__avatar_url)
    const quickUsername = String (rest.__username)   === 'undefined' ? getUserCache()  : String (rest.__username)
    const quickLogin    = String (rest.__isLogged)   === 'undefined' ? false           : Boolean(rest.__isLogged)

    /*
        console.info(`
            ORIGIN-quickImage    : ${rest.__avatar_url}
            ORIGIN-quickUsername : ${rest.__username}
            ORIGIN-quickLogin    : ${rest.__isLogged}

            quickImage    : ${quickImage}
            quickUsername : ${quickUsername}
            quickLogin    : ${quickLogin}
        `) // - Look info
    */

    const [__id,         setId]         = useState(undefined)
    const [__avatar_url, setAvatar_url] = useState(quickImage)
    const [__type,       setType]       = useState(undefined)
    const [__name,       setName]       = useState(undefined)
    const [__username,   setUsername]   = useState(quickUsername)
    const [__isLogged,   setIsLogged]   = useState(quickLogin)

    /*
        console.info(`
            Id       : ${__id}
            Image    : ${__avatar_url}
            Type     : ${__type}
            Name     : ${__name}
            Username : ${__username}
            Logged   : ${__isLogged}
        `) // - Look info
    */

    useEffect(() => {
        Cookies.set('__username',   String(__username))
        Cookies.set('__avatar_url', String(__avatar_url))
        Cookies.set('__isLogged',   String(__isLogged))
    }, [__username, __avatar_url, __isLogged])

    function verifyUser() {
        const quickInputUsername = Cookies.get('usernameCacheForValidation')

        axios
            .get(`https://api.github.com/users/${quickInputUsername}`)
            .then(resp => {
                if (resp.data.type === 'User') {
                    // - User exists
                    console.info(`Access allowed: Welcome to MoveIt ${resp.data.name}`)
                    getInfoUser(resp)
                    toastSuccess()
                    login()
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
        setAvatar_url (resp.data.avatar_url)
        setType       (resp.data.type)
        setName       (resp.data.name)
        setUsername   (resp.data.login)

        /*
            console.info(`
                Id       : ${resp.data.id}
                Image    : ${resp.data.avatar_url}
                Type     : ${resp.data.type}
                Name     : ${resp.data.name}
                Username : ${resp.data.login}
            `) // - Look info
        */
    }
    function login() { // - Basic Login
        setIsLogged(true)
    }
    function logout() {
        setIsLogged(false)
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

    return (
        <LoginContext.Provider
            value={{
                __id,
                __type,
                __name,
                __username,
                __avatar_url,
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