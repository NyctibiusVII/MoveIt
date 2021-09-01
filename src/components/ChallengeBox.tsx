/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { CountdownContext }  from '../contexts/CountdownContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import Image from 'next/image'

import styles from '../styles/components/ChallengeBox.module.css'

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

    const challengeImage = () => `/icons/${activeChallenge.type}.svg`
    const levelUpImage   = () => `/icons/level-up.svg`

    const LevelUp = () => {
        return(
            <Image
                loader={levelUpImage}
                src='
                    <svg width="59" height="80" viewBox="0 0 59 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M43.3272 33.5322V58.4572H15.1403V33.5322H3.86548L29.2337 3.04053L54.602 33.5322H43.3272Z" fill="#4CD62B"/>
                        <path d="M55.6392 36.3211C54.7902 36.3211 53.95 35.9714 53.3703 35.2944L29.2812 7.16071L5.195 35.2944C4.16738 36.4945 2.32878 36.6651 1.07573 35.6916C-0.177327 34.7097 -0.361767 32.9502 0.659999 31.7557L27.0122 0.975602C28.1277 -0.325201 30.4318 -0.325201 31.5472 0.975602L57.9023 31.7557C58.927 32.9502 58.7397 34.7125 57.4866 35.6916C56.945 36.1141 56.2921 36.3211 55.6392 36.3211Z" fill="#4CD62B" />
                        <path d="M14.6423 61.4982C13.0233 61.4982 11.7146 60.2478 11.7146 58.7008V33.524C11.7146 31.977 13.0233 30.7266 14.6423 30.7266C16.2613 30.7266 17.57 31.977 17.57 33.524V58.7008C17.57 60.2478 16.2613 61.4982 14.6423 61.4982Z" fill="#4CD62B" />
                        <path d="M43.9193 61.4979H14.6423C13.0233 61.4979 11.7146 60.2475 11.7146 58.7005C11.7146 57.1535 13.0233 55.9031 14.6423 55.9031H43.9193C45.5383 55.9031 46.847 57.1535 46.847 58.7005C46.847 60.2475 45.5383 61.4979 43.9193 61.4979Z" fill="#4CD62B" />
                        <path d="M43.9199 61.4982C42.3009 61.4982 40.9922 60.2478 40.9922 58.7008V33.524C40.9922 31.977 42.3009 30.7266 43.9199 30.7266C45.5389 30.7266 46.8476 31.977 46.8476 33.524V58.7008C46.8476 60.2478 45.5389 61.4982 43.9199 61.4982Z" fill="#4CD62B" />
                        <path d="M14.6431 36.3214H2.92941C1.31039 36.3214 0.00170898 35.071 0.00170898 33.524C0.00170898 31.977 1.31039 30.7266 2.92941 30.7266H14.6431C16.2621 30.7266 17.5708 31.977 17.5708 33.524C17.5708 35.071 16.2621 36.3214 14.6431 36.3214Z" fill="#4CD62B" />
                        <path d="M55.6365 36.3214H43.9199C42.3009 36.3214 40.9922 35.071 40.9922 33.524C40.9922 31.977 42.3009 30.7266 43.9199 30.7266H55.6365C57.2555 30.7266 58.5642 31.977 58.5642 33.524C58.5642 35.071 57.2555 36.3214 55.6365 36.3214Z" fill="#4CD62B" />
                        <path d="M34.872 39.2014H23.5973C22.0385 39.2014 20.7786 37.9222 20.7786 36.3397C20.7786 34.7572 22.0385 33.478 23.5973 33.478H34.872C36.4308 33.478 37.6907 34.7572 37.6907 36.3397C37.6907 37.9222 36.4308 39.2014 34.872 39.2014Z" fill="#3FB023" />
                        <path d="M29.2342 44.9222C27.6755 44.9222 26.4155 43.643 26.4155 42.0605V30.6194C26.4155 29.0369 27.6755 27.7577 29.2342 27.7577C30.793 27.7577 32.0529 29.0369 32.0529 30.6194V42.0605C32.0529 43.643 30.793 44.9222 29.2342 44.9222Z" fill="#3FB023" />
                        <rect x="11.6938" y="65.1582" width="35.1773" height="5.59071" rx="2.79536" fill="#4DD82B" />
                        <rect x="11.6938" y="74.4093" width="35.1773" height="5.59071" rx="2.79536" fill="#4DD82B" />
                    </svg>'
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
                                loader={challengeImage}
                                src={`/icons/${activeChallenge.type}.svg`}
                                alt="Desafio"
                                width={ImgSize.Large_x120}
                                height={ImgSize.Large_x120}
                                placeholder="blur"
                                blurDataURL={`/icons/${activeChallenge.type}.svg`}
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