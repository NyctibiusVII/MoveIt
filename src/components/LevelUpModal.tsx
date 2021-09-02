/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import useWindowDimensions   from '../contexts/WindowDimensions'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import detailAImage from '../../public/icons/detail-A.svg'
import detailBImage from '../../public/icons/detail-B.svg'
import twitterImage from '../../public/icons/twitter.svg'

import Confetti from 'react-confetti'

import Image     from 'next/image'
import getConfig from 'next/config'

import defaultModalStyles from '../styles/components/DefaultModal.module.css'
import styles             from '../styles/components/LevelUpModal.module.css'

/* ---------------------------------------------------------------------- */

var toType = (obj: any) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)![1].toLowerCase()

export function LevelUpModal() {
    const { level, currentExperience, challengesCompleted, closeLevelUpModal } = useContext(ChallengesContext)
    const { width, height } = useWindowDimensions()

    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

    const root        = publicRuntimeConfig.SITE_URL_BASE
    const rootTwitter = publicRuntimeConfig.SITE_URL_BASE_TWITTER_INTENT

    const dataForTwitterContent = {
        text               : `Avancei para o próximo level no MoveIt. Meu status atual: level ${level}, xp ${currentExperience} e ${challengesCompleted} desafios completos.`,
        linkShareNextLevel : `${root}api/image-generator?level=${level}&currentExperience=${currentExperience}&challengesCompleted=${challengesCompleted}`,
        hashtags           : 'MoveIt,Rocketseat,NLW4,NyctibiusVII',
        author             : 'NyctibiusVII'
    }
    const shareWithTwitter = () => {
        const customText     = _isString(dataForTwitterContent.text)               === true ? customizationForURL(dataForTwitterContent.text)               : 'TypeError%28text%29'
        const customLink     = _isString(dataForTwitterContent.linkShareNextLevel) === true ? customizationForURL(dataForTwitterContent.linkShareNextLevel) : 'TypeError%28link%29'
        const customHashtags = _isString(dataForTwitterContent.hashtags)           === true ? customizationForURL(dataForTwitterContent.hashtags)           : 'TypeError%28hashtags%29'
        const customAuthor   = _isString(dataForTwitterContent.author)             === true ? customizationForURL(dataForTwitterContent.author)             : 'TypeError%28author%29'

        const nextLine = '%0D%0D'

        function _isString(text: any) {
            if (toType(text) !== "string") {
                typeError(text)
                return false
            }
            return true
        }
        function typeError (text: any) { console.error(`Error function\n\nfunction isString() waiting for 'String'\nData received : '${text}'\ntypeof        : '${toType(text)}'`) }

        window.open(
            `${rootTwitter}text=${customText}${nextLine}Veja%20aqui%3A%0D&url=${customLink}${nextLine}&hashtags=${customHashtags}&via=${customAuthor}`,
            '_blank'
        )
    }
    function customizationForURL(text: string) {
        const __space        = "%20" //
        const __comma        = "%2C" // ,
        const __bar          = "%2F" // /
        const __two_points   = "%3A" // :
        const __e_commercial = "%26" // &

        return text.replace(/ /g, __space).replace(/,/g, __comma).replace(/\//g, __bar).replace(/:/g, __two_points).replace(/&/g, __e_commercial)
    }

    return (
        <div className={`${styles.overlay} ${defaultModalStyles.overlay}`}>
            <Confetti
                width={width}
                height={height}
                numberOfPieces={1000}
                recycle={false}
            />
            <div className={`${styles.container} ${defaultModalStyles.container}`}>
                <div className={styles.subContainer}>
                    <div className={styles.containerDetailLevel}>
                        <Image
                            src={detailAImage}
                            className={styles.detailA}
                            alt="Detalhe a"
                            width={ImgSize.Large_x120 - 20}
                            height={ImgSize.Large_x120 + 20}
                        />
                        <div className={styles.level}>
                            <span>{level}</span>
                        </div>
                        <Image
                            src={detailBImage}
                            className={styles.detailB}
                            alt="Detalhe b"
                            width={ImgSize.Large_x120 - 20}
                            height={ImgSize.Large_x120 + 20}
                        />
                    </div>

                    <strong>Parabéns</strong>
                    <p>Você alcançou um novo level.</p>
                    <button type="button" className={styles.close} onClick={closeLevelUpModal}>
                        <p>✖</p>
                    </button>
                </div>
                <footer>
                    <button type="button" className={styles.buttonShareWithTwitter} onClick={shareWithTwitter}>
                            Compartilhar no Twitter&nbsp;&nbsp;&nbsp;
                            <Image
                                src={twitterImage}
                                className={styles.logoTwitter}
                                alt="Compartilhar com Twitter"
                                width={ImgSize.Little_x20}
                                height={ImgSize.Little_x20}
                            />
                    </button>
                </footer>
            </div>
        </div>
    )
}