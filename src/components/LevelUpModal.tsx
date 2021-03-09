import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'

import Confetti from 'react-confetti'
import useWindowDimensions from '../contexts/WindowDimensions'
import styles from '../styles/components/LevelUpModal.module.css'

var toType = function(obj: any) {return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}

export function LevelUpModal() {
    const { level, currentExperience, challengesCompleted, closeLevelUpModal, } = useContext(ChallengesContext)
    const { width, height } = useWindowDimensions()

    const root = 'https://moveit-nyctibiusvii.vercel.app/'
    const rootTwitter = 'https://twitter.com/intent/tweet?'

    const dataForTwitterContent = {
        text: `Avancei para o próximo level no MoveIt. Meu status atual: level ${level}, xp ${currentExperience} e ${challengesCompleted} desafios completos.`,
        linkShareNextLevel: `${root}api/image-generator?level=${level}&currentExperience=${currentExperience}&challengesCompleted=${challengesCompleted}`,
        hashtags: 'MoveIt,Rocketseat,NLW4,NyctibiusVII',
        author: 'NyctibiusVII'
    }
    const shareWithTwitter = () => {
        const customText = _isString(dataForTwitterContent.text) === true ? customizationForURL(dataForTwitterContent.text) : 'TypeError%28text%29'
        const customLink = _isString(dataForTwitterContent.linkShareNextLevel) === true ? customizationForURL(dataForTwitterContent.linkShareNextLevel) : 'TypeError%28link%29'
        const customHashtags = _isString(dataForTwitterContent.hashtags) === true ? customizationForURL(dataForTwitterContent.hashtags) : 'TypeError%28hashtags%29'
        const customAuthor = _isString(dataForTwitterContent.author) === true ? customizationForURL(dataForTwitterContent.author) : 'TypeError%28author%29'

        const nextLine = '%0D%0D'

        function _isString(text:any) {
            if (toType(text) !== "string") {
                typeError(text)
                return false
            }
            return true
        }
        function typeError(text:any) {
            console.error('Error function\n\"function isString() waiting for \'String\'\"\n\nData received:\n'+text+'\n\ntypeof:\n'+toType(text))
        }

        window.open(
            `${rootTwitter}text=${customText}${nextLine}Veja%20aqui%3A%0D&url=${customLink}${nextLine}&hashtags=${customHashtags}&via=${customAuthor}`,
             '_blank'
        )
    }
    function customizationForURL(text:string) {
        const __space = "%20"      //
        const __comma = "%2C"      // ,
        const __bar = "%2F"        // /
        const __two_points = "%3A" // :
        const __e_commercial = "%26" // &

        return text.replace(/ /g, __space).replace(/,/g, __comma).replace(/\//g, __bar).replace(/:/g, __two_points).replace(/&/g, __e_commercial)
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
                        <p>✖</p>
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