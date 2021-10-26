/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { CountdownContext }  from '../contexts/CountdownContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import levelUpImage from '../../public/icons/level-up.svg'
import bodyImage    from '../../public/icons/body.svg'
import eyeImage     from '../../public/icons/eye.svg'

import Image from 'next/image'

import styles from '../styles/components/ChallengeBox.module.scss'

/* ---------------------------------------------------------------------- */

export function ChallengeBox() {
    const { activeChallenge,  resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const { isCounting, resetCountdown } = useContext(CountdownContext)

    const handleChallengeSucceeded = () => {
        completeChallenge()
        resetCountdown()
    }
    const handleChallengeFailed = () => {
        resetChallenge()
        resetCountdown()
    }

    const challengeImage = (): StaticImageData => {
        switch (activeChallenge.type) {
            case 'body':
                return bodyImage
            case 'eye':
                return eyeImage
        }
    }

    const LevelUp = () => {
        return(
            <Image
                src={levelUpImage}
                alt="Level Up"
                width={ImgSize.Medium_x80}
                height={ImgSize.Medium_x80}
            />
        )
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <>
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} xp</header>

                        <main>
                            <Image
                                src={challengeImage()}
                                alt="Desafio"
                                width={ImgSize.Large_x120}
                                height={ImgSize.Large_x120}
                            />
                            <strong>Novo desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                    </div>
                    <footer>
                        <button type="button" className={styles.challengeFailButton}      onClick={handleChallengeFailed}   >Falhei</button>
                        <button type="button" className={styles.challengeSucceededButton} onClick={handleChallengeSucceeded}>Completei</button>
                    </footer>
                </>
            ) : (
                <>
                    { isCounting ? (
                        <div className={styles.endTheCycle}>
                            <strong>Termine um ciclo para receber desafios a serem completados</strong>
                            <div>
                                <LevelUp />
                                <p>Complete-os e ganhe experiência e avance de level.</p>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.challengeNotActive}>
                            <strong>Inicie um ciclo para receber desafios</strong>
                            <div>
                                <LevelUp />
                                <p>Avance de level completando desafios.</p>
                            </div>
                        </div>
                    ) }
                </>
            ) }
        </div>
    )
}