import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'

import Confetti from 'react-confetti'
import useWindowDimensions from '../contexts/WindowDimensions'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengesContext)
    //const { shareWithTwitter } = useContext(ChallengesContext)
    const shareWithTwitter = () => {alert("Share with Twitter\n\nEm breve...")}
    const { width, height } = useWindowDimensions()

    return (
        <div className={styles.overlay}>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
            />
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <header>{level}</header>
                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level.</p>
                    <button type="button" className={styles.close} onClick={closeLevelUpModal}>
                        <img src="/icons/close.svg" alt="Fechar modal" />
                    </button>
                </div>
                <footer>
                    <button type="button" className={styles.buttonShareWithTwitter} onClick={shareWithTwitter}>
                        Compartilhar no Twitter&nbsp;&nbsp;&nbsp;<img src="/icons/twitter-blue.svg" className={styles.logoTwitter} alt="Compartilhar com Twitter" />
                    </button>
                </footer>
            </div>
        </div>
    )
}