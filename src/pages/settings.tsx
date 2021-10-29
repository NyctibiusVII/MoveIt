/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesProvider } from '../contexts/ChallengesContexts'
import { DangerZoneProvider } from '../contexts/DangerZoneContext'
import { LoginProvider }      from '../contexts/LoginContext'


import { Appearance }        from '../components/Appearance'
import { ButtonLoggedInOut } from '../components/ButtonLoggedInOut'
import { CardList }          from '../components/CardList'
import { DangerZone }        from '../components/DangerZone'

import { User }     from '../interface/user'
import { AppProps } from '../interface/appProps'
import { ISLOGGED } from '../interface/cookiesType'
import { api }      from '../services/api'

import { GetServerSideProps } from 'next'

import Cookies from 'js-cookie'

import Head from 'next/head'

import styles from '../styles/pages/settings.module.scss'

/* ---------------------------------------------------------------------- */

interface SettingsProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export default function Settings(props: SettingsProps) {
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
                <DangerZoneProvider>
                    <div className={styles.container}>
                        <Head>
                            <title>Settings | MoveIt</title>
                        </Head>
                        <header>
                            <h1>Configurações</h1>
                        </header>

                        <section className={styles.profileContainer}>
                            <h2 className={styles.subTitle}>Perfil</h2>
                            <div className={styles.separator} />
                                <CardList page='settings'/>
                            <h2 className={styles.subTitle}>Informações públicas</h2>
                            <div className={styles.separator} />
                                Em breve...
                        </section>

                        <main>
                            <h2 className={styles.subTitle}>Geral</h2>
                            <div className={styles.separator} />
                                <ButtonLoggedInOut/>
                            <h2 className={styles.subTitle}>Preferências de tema</h2>
                            <div className={styles.separator} />
                                <Appearance />
                            <h2 className={`${styles.subTitle} ${styles.dangerZoneTitle}`}>Zona de perigo</h2>
                            <div className={styles.separator} />
                                <DangerZone />
                        </main>
                    </div>
                </DangerZoneProvider>
            </ChallengesProvider>
        </LoginProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { __username, __isLogged } = ctx.req.cookies

    const UseDb = async (): Promise<AppProps> => {
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