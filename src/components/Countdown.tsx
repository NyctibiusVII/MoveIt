import { useContext, useState } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
    const {
        percentToEndCycle,
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown
    } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    const [PERCENT_TO_END_CYCLE, set_PERCENT_TO_END_CYCLE] = useState(0)
    setTimeout(() => {
        set_PERCENT_TO_END_CYCLE(percentToEndCycle)
    }, 1000)

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo encerrado&nbsp;&nbsp;&nbsp;<img src="/icons/verified.svg" alt="Verificado" />
                    <div className={styles.currentCountdown}>
                        <div style={{ width: `${PERCENT_TO_END_CYCLE}%` }}/>
                    </div>
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}> 
                            <strong>Abandonar ciclo</strong>
                            <div className={styles.currentCountdown}>
                                <div style={{ width: `${PERCENT_TO_END_CYCLE}%` }}/>
                            </div>
                        </button>
                    ) : (
                        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                            <strong>Iníciar um ciclo</strong>
                        </button>
                    ) }
                </>
            ) }
        </div>
    )
}