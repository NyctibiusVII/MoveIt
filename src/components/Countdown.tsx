/* Import ---------------------------------------------------------------------- */ // - x70

import { CountdownContext } from '../contexts/CountdownContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import Image from 'next/image'

import styles from '../styles/components/Countdown.module.css'

/* ---------------------------------------------------------------------- */

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

    const verifiedImage = () => `/icons/verified.svg`

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
                    Ciclo encerrado&nbsp;&nbsp;&nbsp;
                        <Image
                            loader={verifiedImage}
                            src='
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.99984 0.666626C4.39984 0.666626 0.666504 4.39996 0.666504 8.99996C0.666504 13.6 4.39984 17.3333 8.99984 17.3333C13.5998 17.3333 17.3332 13.6 17.3332 8.99996C17.3332 4.39996 13.5998 0.666626 8.99984 0.666626ZM7.33317 13.1666L3.1665 8.99996L4.3415 7.82496L7.33317 10.8083L13.6582 4.48329L14.8332 5.66663L7.33317 13.1666Z" fill="#4CD62B"/>
                                </svg>'
                            alt="Verificado"
                            width={ImgSize.Mini_x16}
                            height={ImgSize.Mini_x16}
                        />
                    <div className={styles.currentCountdown}>
                        <div style={{ width: `${percentToEndCycle}%` }}/>
                    </div>
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                            Abandonar ciclo&nbsp;&nbsp;&nbsp;<p>✖</p>
                            <div className={styles.currentCountdown}>
                                <div style={{ width: `${percentToEndCycle}%` }}/>
                            </div>
                        </button>
                    ) : (
                        <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                            Iníciar um ciclo&nbsp;&nbsp;&nbsp;<p>►</p>
                        </button>
                    ) }
                </>
            ) }
        </div>
    )
}