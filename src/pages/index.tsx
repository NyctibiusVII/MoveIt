import { CountdownProvider }  from "../contexts/CountdownContext"
import { ChallengesProvider } from "../contexts/ChallengesContexts"
import { LoginProvider }      from "../contexts/LoginContext"

import { Profile }             from "../components/Profile"
import { ExperienceBar }       from "../components/ExperienceBar"
import { Countdown }           from "../components/Countdown"
import { ChallengeBox }        from "../components/ChallengeBox"
import { CompletedChallenges } from "../components/CompletedChallenges"

import { GetServerSideProps } from "next"

import Head    from "next/head"
import Cookies from "js-cookie"
import styles  from "../styles/pages/home.module.css"

interface HomeProps {
    __username:   String
    __avatar_url: String
    __isLogged:   Boolean

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export default function Home(props:HomeProps) {
    Cookies.set('sidebar&FAB', 'enable') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    return (
        <LoginProvider
            __username={props.__username}
            __avatar_url={props.__avatar_url}
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
    const { __username, __avatar_url, __isLogged, level, currentExperience, challengesCompleted } = ctx.req.cookies

    return {
        props: {
            __username:   String(__username),
            __avatar_url: String(__avatar_url),
            __isLogged:   Boolean(__isLogged),

            level:               Number(level),
            currentExperience:   Number(currentExperience),
            challengesCompleted: Number(challengesCompleted)
        }
    }
}