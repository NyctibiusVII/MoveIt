import { LoginProvider }      from "../contexts/LoginContext"
import { ChallengesProvider } from "../contexts/ChallengesContexts"

import { GetServerSideProps } from "next"

import Head    from "next/head"
import Cookies from "js-cookie"
import styles  from "../styles/pages/leaderbord.module.css"

interface LeaderboardProps {
  __username:   String
  __avatar_url: String
  __isLogged:   Boolean

  level:               number
  currentExperience:   number
  challengesCompleted: number
}

export default function Leaderboard(props:LeaderboardProps) {
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
                      <title>Leaderboard | MoveIt</title>
                  </Head>

                  <h1>Leaderboard</h1>
                  <h3>Em breve...</h3>
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