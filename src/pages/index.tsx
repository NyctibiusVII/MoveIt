import styles from "../styles/pages/home.module.css";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import Head from 'next/head';

export default function Home() {
  return (
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
  )
}
