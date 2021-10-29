/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesProvider } from '../contexts/ChallengesContexts'
import { LoginProvider }      from '../contexts/LoginContext'

import { ButtonLoggedInOut } from '../components/ButtonLoggedInOut'
import { CardList }          from '../components/CardList'

import {
    useEffect,
    useState
} from 'react'
import { api }      from '../services/api'
import { ISLOGGED } from '../interface/cookiesType'
import { User, UserAPI }                from '../interface/user'
import { AppProps, AppPropsLeaderbord } from '../interface/appProps'

import { GetServerSideProps } from 'next'

import Cookies from 'js-cookie'

import Head from 'next/head'

import styles from '../styles/pages/leaderbord.module.scss'

/* ---------------------------------------------------------------------- */

interface LeaderboardProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number

    users: UserAPI | null
}

export default function Leaderboard(props: LeaderboardProps) {
    Cookies.set('sidebar&FAB', 'enable') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    /* ------- */ const [ isLogged, setIsLogged ] = useState(Boolean)
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     setIsLogged(Cookies.get('__isLogged') === '1')
    /* ------- */ }, [])

    return (
        <LoginProvider
            __avatar_url={props.__avatar_url}
            __username={props.__username}
            __isLogged={props.__isLogged}
        >
            <ChallengesProvider
                level={props.level}
                currentExperience={props.currentExperience}
                challengesCompleted={props.challengesCompleted}
            >
                <div className={styles.container}>
                    <Head>
                        <title>Leaderboard | MoveIt</title>
                    </Head>

                    <h1>Leaderboard</h1>
                    { isLogged ? <CardList page='leaderbord' users={props.users} />
                    : (
                        <div className={styles.notAuthorized}>
                            <h3>Faça login para ter acesso a este conteúdo</h3>
                            <ButtonLoggedInOut/>
                        </div>
                    ) }
                </div>
            </ChallengesProvider>
        </LoginProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { __username, __isLogged } = ctx.req.cookies

    const getLeaderbord = async (): Promise<UserAPI> => {
        const { data } = await api.get(`/users`)

        return data
    }

    const UseDb = async (): Promise<AppPropsLeaderbord> => {
        const { data } = await api.get(`/users/${__username}`)

        const user: User = {
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

        const users = await getLeaderbord()

        return {
            props: {
                __avatar_url: String(user.avatar_url),
                __username:   String(user.username),
                __isLogged:   Number(__isLogged), // - Cookies

                level:               Number(user.level),
                currentExperience:   Number(user.current_experience),
                challengesCompleted: Number(user.challenges_completed),

                users: users ?? null
            }
        }
    }
    const UseCookies = (): AppProps => {
        const { __avatar_url, level, currentExperience, challengesCompleted } = ctx.req.cookies

        return {
            props: {
                __avatar_url: String(__avatar_url),
                __username:   String(__username),
                __isLogged:   Number(__isLogged),

                level:               Number(level),
                currentExperience:   Number(currentExperience),
                challengesCompleted: Number(challengesCompleted)
            }
        }
    }

    return __isLogged === ISLOGGED.__true ? UseDb() : UseCookies()
}