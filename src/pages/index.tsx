import { CountdownProvider }  from '../contexts/CountdownContext'
import { ChallengesProvider } from '../contexts/ChallengesContexts'
import { LoginProvider }      from '../contexts/LoginContext'

import { Profile }             from '../components/Profile'
import { ExperienceBar }       from '../components/ExperienceBar'
import { Countdown }           from '../components/Countdown'
import { ChallengeBox }        from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'

import { User }     from '../interface/user'
import { AppProps } from '../interface/appProps'
import { ISLOGGED } from '../interface/cookiesType'
import { api }      from '../services/api'

import { GetServerSideProps } from 'next'

import Head    from 'next/head'
import Cookies from 'js-cookie'
import styles  from '../styles/pages/home.module.css'

interface HomeProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export default function Home(props: HomeProps) {
    Cookies.set('sidebar&FAB', 'enable') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

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
                        <title>Início | MoveIt</title>
                    </Head>

                    <ExperienceBar />

                    <CountdownProvider>
                        <section>
                            <div>
                                <Profile />
                                <CompletedChallenges />
                                <Countdown />
                            </div>
                            <div>
                                <ChallengeBox />
                            </div>
                        </section>
                    </CountdownProvider>
                </div>
            </ChallengesProvider>
        </LoginProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { __username, __isLogged } = ctx.req.cookies

    const usedb = async (): Promise<AppProps> => {
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

        return {
            props: {
                __avatar_url: String(user.avatar_url),
                __username:   String(user.username),
                __isLogged:   Number(__isLogged), // - Cookies

                level:               Number(user.level),
                currentExperience:   Number(user.current_experience),
                challengesCompleted: Number(user.challenges_completed)
            }
        }
    }
    const useCookies = (): AppProps => {
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

    return __isLogged === ISLOGGED.__true ? usedb() : useCookies()
}