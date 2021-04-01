import { LoginContext, LoginProvider } from "../contexts/LoginContext"
import { ChallengesProvider }          from "../contexts/ChallengesContexts"

import { ButtonLoggedInOut } from "../components/ButtonLoggedInOut"

import { useContext, useEffect, useState } from "react"
import { GetServerSideProps }              from "next"

import Head    from "next/head"
import Cookies from "js-cookie"
import styles  from "../styles/pages/leaderbord.module.css"

interface LeaderboardProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export default function Leaderboard(props:LeaderboardProps) {
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
              <div className={styles.container}>
                  <Head>
                      <title>Leaderboard | MoveIt</title>
                  </Head>

                  <h1>Leaderboard</h1>
                  { isLogged ? (
                      <>
                          <h3>Em breve...</h3>
                      </>
                  ) : (
                      <>
                          <h3>Faça login pra ter acesso a este conteúdo</h3>
                          <ButtonLoggedInOut/>
                      </>
                  ) }
              </div>
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
          __isLogged:   Number(__isLogged),

          level:               Number(level),
          currentExperience:   Number(currentExperience),
          challengesCompleted: Number(challengesCompleted)
      }
  }
}