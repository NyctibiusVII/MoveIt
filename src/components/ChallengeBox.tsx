import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const { activeChallenge,  resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const { isCounting } = useContext(CountdownContext)
    const { resetCountdown } = useContext(CountdownContext)

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountdown()
    }
    function handleChallengeFailed() {
        resetChallenge()
        resetCountdown()
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <>
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>

                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                    </div>
                    <footer>
                        <button type="button" className={styles.challengeFailButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>Completei</button>
                    </footer>
                </>
            ) : (
                <>
                    { isCounting ? (
                        <div className={styles.endTheCycle}>
                            <strong>Termine um ciclo para receber desafios a serem completados</strong>
                            <div>
                                <img src="icons/level-up.svg" alt="Level Up" />
                                <p>Complete-os e ganhe experiência e avance de level.</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.challengeNotActive}>
                            <strong>Inicie um ciclo para receber desafios</strong>
                            <p>
                                <img src="icons/level-up.svg" alt="Level Up" />
                                Avance de level completando desafios.
                            </p>
                        </div>
                    ) }
                </>
            ) }
        </div>
    )
}