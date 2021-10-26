/* Import ---------------------------------------------------------------------- */ // - x70

import { CountdownContext } from '../contexts/CountdownContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import verifiedImage from '../../public/icons/verified.svg'

import Image from 'next/image'

import styles from '../styles/components/Countdown.module.scss'

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
                            src={verifiedImage}
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
                            Iniciar um ciclo&nbsp;&nbsp;&nbsp;<p>►</p>
                        </button>
                    ) }
                </>
            ) }
        </div>
    )
}