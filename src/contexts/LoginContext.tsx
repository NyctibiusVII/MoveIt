/* Import ---------------------------------------------------------------------- */ // - x70

import { SidebarContext } from './SidebarContext'
import { ToastContext }   from './ToastContext'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'
import { useTheme } from 'next-themes'

import { api, github_api } from '../services/api'

import { User }                  from '../interface/user'
import { UserGithub }            from '../interface/userGithub'
import { CookiesType, ISLOGGED } from '../interface/cookiesType'

import Cookies from 'js-cookie'

import getConfig from 'next/config'
import Router    from 'next/router'

/* ---------------------------------------------------------------------- */

interface LoginContextData {
    __avatar_url: string
    __username:   string
    __isLogged:   number
    verifyUser:   () => void
    login:        () => void
    logout:       () => void
}
interface LoginProviderProps {
    children:     ReactNode
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export const LoginContext = createContext({} as LoginContextData)

const date = new Date()

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
    const { goHome  } = useContext(SidebarContext)
    const { toastON } = useContext(ToastContext)

    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

    const avatarsGithubURL = publicRuntimeConfig.SITE_URL_BASE_AVATAR_GITHUB
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

    const [ __avatar_url, setAvatar_url ] = useState(quickImage)
    const [ __username,   setUsername   ] = useState(quickUsername)
    const [ __isLogged,   setIsLogged   ] = useState(quickLogin)
    const { setTheme } = useTheme()



    useEffect(() => {
        Cookies.set(CookiesType.__avatar_url, String(__avatar_url))
        Cookies.set(CookiesType.__username,   String(__username))
        Cookies.set(CookiesType.__isLogged,   String(__isLogged))
    }, [ __avatar_url, __username, __isLogged ])



    async function verifyUser() {
        const quickInputUsername = Cookies.get(CookiesType.usernameCacheForValidation)

        await github_api
            .get(`/users/${quickInputUsername}`)
            .then(async ({ data }) => {
                // - User exists in Github

                const user: UserGithub = {
                    login:   data.login,
                    id:      data.id,
                    node_id: data.node_id,
                    avatar_url:  data.avatar_url,
                    gravatar_id: data.gravatar_id,
                    url:      data.url,
                    html_url: data.html_url,
                    followers_url: data.followers_url,
                    following_url: data.following_url,
                    gists_url:     data.gists_url,
                    starred_url:   data.starred_url,
                    subscriptions_url: data.subscriptions_url,
                    organizations_url: data.organizations_url,
                    repos_url:  data.repos_url,
                    events_url: data.events_url,
                    received_events_url: data.received_events_url,
                    type:       data.type,
                    site_admin: data.site_admin,
                    name:     data.name,
                    company:  data.company,
                    blog:     data.blog,
                    location: data.location,
                    email:    data.email,
                    hireable: data.hireable,
                    bio:      data.bio,
                    twitter_username: data.twitter_username,
                    public_repos: data.public_repos,
                    public_gists: data.public_gists,
                    followers:    data.followers,
                    following:    data.following,
                    created_at: data.created_at,
                    updated_at: data.updated_at
                }

                if (user.type === 'User') {
                    // - User

                    await api
                        .get(`/users/${quickInputUsername}`, {
                            validateStatus: (status: number): boolean => status < 500 // - Resolve only if the status code is less than 500
                        })
                        .then(resp => {
                            if (Number(resp.request.status) === 200) {
                                // - User exists in db

                                const
                                    data: User = resp.data,
                                    user: User = {
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
                                        cookie_consent: data.cookie_consent
                                    }

                                Promise
                                    .resolve(setCookiesFromDb(user))
                                    .then(() => {
                                        toastSuccess()
                                        console.info(`Access allowed: Welcome back to MoveIt ${user.username} 🥳`)

                                        login()
                                    })
                                    .catch(e => { throw e })
                            } else if (Number(resp.request.status) === 400) {
                                // - User does not exist in db

                                Promise
                                    .resolve(setCookiesFromGithub(user))
                                    .then(async () => {
                                        // - createUserinDb(user)
                                        const
                                            level               = Cookies.get(CookiesType.level),
                                            currentExperience   = Cookies.get(CookiesType.currentExperience),
                                            challengesCompleted = Cookies.get(CookiesType.challengesCompleted),
                                            activeTheme         = Cookies.get(CookiesType.activeTheme),
                                            cookieConsent       = Cookies.get(CookiesType.cookieConsent)

                                        const newUser: User = {
                                            github_id:  String(user.id),
                                            avatar_url: String(user.avatar_url),
                                            username:   String(user.login),
                                            name:  String(user.name),
                                            email: String(user.email),
                                            type:  String(user.type),
                                            level:                Number(level)               ?? Number(process.env.STANDARD_LEVEL),                // - Default level
                                            current_experience:   Number(currentExperience)   ?? Number(process.env.STANDARD_CURRENT_EXPERIENCE),   // - Default experience
                                            challenges_completed: Number(challengesCompleted) ?? Number(process.env.STANDARD_CHALLENGES_COMPLETED), // - Default challenges
                                            theme:          String(activeTheme)   ?? String(process.env.DEFAULT_THEME),         // - Default theme
                                            cookie_consent: Number(cookieConsent) ?? Number(process.env.DEFAULT_COOKIE_CONSENT) // - Default cookie consent
                                        }

                                        await api
                                            .post(`/users`, newUser)
                                            .then(resp => {
                                                if (Number(resp.request.status) === 201) {
                                                    toastSuccess()
                                                    console.info(`Access allowed: Welcome to MoveIt ${user.login} 🥳`)

                                                    login()
                                                } else { return Promise.reject('Error: uncreated user') }
                                            })
                                            .catch(e => { throw e })
                                    })
                                    .catch(e => { throw e })
                            } else { console.error(process.env.ERROR_GET) }
                        })
                        .catch(e => { throw e })
                } else {
                    // - Organization

                    toastWarn()
                    console.warn('Access denied: You cannot enter an organization name!\nOnly users are allowed')
                }
            })
            .catch(e => {
                // - User does not exist in Github

                toastError()
                console.error(e+'\n\nUser does not exist in Github')
            })
    }

    const setCookiesFromDb = (user: User): void => {
        // - Not strictly mandatory
        setAvatar_url (user.avatar_url)
        setUsername   (user.username)
        setTheme      (user.theme)

        Cookies.set(CookiesType.level,               String(user.level))
        Cookies.set(CookiesType.currentExperience,   String(user.current_experience))
        Cookies.set(CookiesType.challengesCompleted, String(user.challenges_completed))

        // - Strictly mandatory
        Cookies.set(CookiesType.activeTheme,   String(user.theme))
        Cookies.set(CookiesType.cookieConsent, String(user.cookie_consent))

        /**
         *  console.info(`
         *      user{
         *          Id       : ${user.github_id}
         *          Image    : ${user.avatar_url}
         *          Username : ${user.username}
         *          Name     : ${user.name}
         *          Email    : ${user.email}
         *          Type     : ${user.type}
         *          Level               : ${user.level}
         *          CurrentExperience   : ${user.current_experience}
         *          ChallengesCompleted : ${user.challenges_completed}
         *          Theme         : ${user.theme}
         *          CookieConsent : ${user.cookie_consent}
         *          // - CreatedAt     : ${user.created_at}
         *          // - UpdatedAt     : ${user.updated_at}
         *      }
         *  `) // - Look info
         */
    }
    const setCookiesFromGithub = (user: UserGithub): void => {
        // - Not strictly mandatory
        setAvatar_url (user.avatar_url)
        setUsername   (user.login)
    }

    function login() {
        setIsLogged(1)   // - Logged

        goHome()         // - Cookie
        Router.push('/') // - Next page
    }
    function logout() {
        Promise
            .all([ setIsLogged(0), Cookies.set('__isLogged', ISLOGGED.__false) ])
            .then(() => {
                Promise
                    .race([
                        setAvatar_url (getImageCache()), // - Without image
                        setUsername   (getUserCache()),  // - Without username
                        Cookies.set   (CookiesType.level,               String(process.env.STANDARD_LEVEL)),               // - Default level
                        Cookies.set   (CookiesType.currentExperience,   String(process.env.STANDARD_CURRENT_EXPERIENCE)),  // - Default experience
                        Cookies.set   (CookiesType.challengesCompleted, String(process.env.STANDARD_CHALLENGES_COMPLETED)) // - Default challenges])
                    ])
                    .then(() => {
                        toastLogout() // - INFO/toast: Logged out
                        console.info(`Session ended successfully: See you later ${Cookies.get('usernameCacheForToast')} 💙`) // - INFO/console: Logged out
                    })
            })
    }

    function toastSuccess() {
        Cookies.set(CookiesType.whichToast, '0')
        toastON()
    }
    function toastWarn() {
        Cookies.set(CookiesType.whichToast, '1')
        toastON()
    }
    function toastError() {
        Cookies.set(CookiesType.whichToast, '2')
        toastON()
    }
    function toastLogout() {
        Cookies.set(CookiesType.whichToast, '3')
        toastON()
    }

    return (
        <LoginContext.Provider
            value={{
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