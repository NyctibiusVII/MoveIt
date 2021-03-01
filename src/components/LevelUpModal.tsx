import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'

import Confetti from 'react-confetti'
import useWindowDimensions from '../contexts/WindowDimensions'
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal() {
    const { level, currentExperience, challengesCompleted, closeLevelUpModal, } = useContext(ChallengesContext)
    //const { shareWithTwitter } = useContext(ChallengesContext)
    const { width, height } = useWindowDimensions()

    const shareWithTwitter = () => {
        const
            root = 'https://moveit-nyctibiusvii.vercel.app/',
            rootTwitter = 'https://twitter.com/intent/tweet?'

        const
            author = 'NyctibiusVII',
            hashtags = 'MoveIt,Rocketseat,NLW4,NyctibiusVII',
            text = `Avancei para o próximo level no MoveIt. Meu status atual: level ${level}, xp ${currentExperience} e ${challengesCompleted} desafios completos.`

        const linkShareNextLevel = `${root}api/image-generator?level=${level}&currentExperience=${currentExperience}&challengesCompleted=${challengesCompleted}`

        const customHashtags = customizationForURL(hashtags)
        const customText = customizationForURL(text)
        const customLink = customizationForURL(linkShareNextLevel)
        const customAuthor = customizationForURL(author)
        
        window.open(
            `${rootTwitter}text=${customText}&url=${customLink}&hashtags=${customHashtags}&via=${customAuthor}`, //TODO - twitter não aceita passar mais de 1 valor na URL. necessario 3 (level, currentExperience, challengesCompleted)
             '_blank'
        )
    }
    function customizationForURL(text:String) {
        const __space = "%20"      //  
        const __comma = "%2C"      // ,
        const __bar = "%2F"        // /
        const __two_points = "%3A" // :

        let _text = text.replace(/ /g, __space).replace(/,/g, __comma).replace(/\//g, __bar).replace(/:/g, __two_points)
        return _text
    }

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
                    <div className={styles.containerDetailLevel}>
                        <img src="/icons/detail-A.svg" className={styles.detailA} alt="Detalhe a" />
                        <div className={styles.level}>
                            <span>{level}</span>
                        </div>
                        <img src="/icons/detail-B.svg" className={styles.detailB} alt="Detalhe b" />
                    </div>

                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level.</p>
                    <button type="button" className={styles.close} onClick={closeLevelUpModal}>
                        <img src="/icons/close.svg" alt="Fechar modal" />
                    </button>
                </div>
                <footer>
                    <button type="button" className={styles.buttonShareWithTwitter} onClick={shareWithTwitter}>
                            Compartilhar no Twitter&nbsp;&nbsp;&nbsp;<img src="/icons/twitter.svg" className={styles.logoTwitter} alt="Compartilhar com Twitter" />
                    </button>
                </footer>
            </div>
        </div>
    )
}