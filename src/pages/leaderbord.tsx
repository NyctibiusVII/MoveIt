import { ChallengesProvider } from "../contexts/ChallengesContexts"
import { GetServerSideProps } from "next"

import Head from "next/head"
import styles from "../styles/pages/leaderbord.module.css"

interface LeaderboardProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Leaderboard(props:LeaderboardProps) {
  return (
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}