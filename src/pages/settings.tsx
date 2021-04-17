import { LoginContext, LoginProvider } from '../contexts/LoginContext'
import { ChallengesProvider }          from '../contexts/ChallengesContexts'
import { DangerZoneProvider }          from '../contexts/DangerZoneContext'

import { CardList }          from '../components/CardList'
import { ButtonLoggedInOut } from '../components/ButtonLoggedInOut'
import { Appearance }        from '../components/Appearance'
import { DangerZone }        from '../components/DangerZone'

import { useContext, useEffect, useState } from 'react'
import { GetServerSideProps }              from 'next'

import Head    from 'next/head'
import Cookies from 'js-cookie'
import styles  from '../styles/pages/settings.module.css'

interface SettingsProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export default function Settings(props:SettingsProps) {
    Cookies.set('sidebar&FAB', 'enable') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    const { login, logout } = useContext(LoginContext)

    /* ------- */ const [isLogged, setIsLogged ] = useState(false)
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     let mounted = true
    /* ------- */
    /* ------- */     Promise
    /* ------- */         .resolve(Cookies.get('__isLogged'))
    /* ------- */         .then(resp => mounted && setIsLogged(Number(resp) === 1 ? true : false))
    /* ------- */         .catch(err => console.error(err))
    /* ------- */
    /* ------- */     return () => { mounted = false } // - Cleanup()
    /* ------- */ }, [ login, logout, [] ])

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
                                <CardList />
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
    const { __username, __avatar_url, __isLogged, level, currentExperience, challengesCompleted } = ctx.req.cookies

    return {
        props: {
            __avatar_url: String(__avatar_url),
            __username:   String(__username),
            __isLogged:   String(__isLogged),

            level:               Number(level),
            currentExperience:   Number(currentExperience),
            challengesCompleted: Number(challengesCompleted)
        }
    }
}