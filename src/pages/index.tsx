import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import Head from 'next/head';

import styles from "../styles/pages/home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | MoveIt</title>
      </Head>
      
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  )
}
