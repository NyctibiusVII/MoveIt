/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import useWindowDimensions   from '../contexts/WindowDimensions'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import Confetti from 'react-confetti'

import Image from 'next/image'

import defaultModalStyles from '../styles/components/DefaultModal.module.css'
import styles             from '../styles/components/LevelUpModal.module.css'

/* ---------------------------------------------------------------------- */

var toType = (obj: any) => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)![1].toLowerCase()

export function LevelUpModal() {
    const { level, currentExperience, challengesCompleted, closeLevelUpModal } = useContext(ChallengesContext)
    const { width, height } = useWindowDimensions()

    const root        = process.env.SITE_URL_BASE
    const rootTwitter = process.env.SITE_URL_BASE_TWITTER_INTENT

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

    const detailAImage = () => `/icons/detail-A.svg`
    const detailBImage = () => `/icons/detail-B.svg`
    const twitterImage = () => `/icons/twitter.svg`

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
                            loader={detailAImage}
                            src='
                                <svg width="162" height="228" viewBox="0 0 162 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M44.9445 56.6257C44.9445 56.6257 57.8535 48.05 57.4465 29.8687C57.05 11.6846 45.4878 0.871704 45.4878 0.871704C45.4878 0.871704 30.6387 11.2856 31.0403 29.0325C31.4336 46.7482 44.9445 56.6257 44.9445 56.6257ZM60.7464 95.5984C60.7464 95.5984 76.4512 89.9943 81.7881 73.101C87.1146 56.2105 75.763 41.9557 75.763 41.9557C75.763 41.9557 61.6751 48.9925 56.1901 66.3277C50.7286 83.6678 60.7464 95.5984 60.7464 95.5984ZM32.9903 93.9734C32.9903 93.9734 38.9929 79.6056 28.6158 64.6764C18.2464 49.7339 2.67661 47.179 2.67661 47.179C2.67661 47.179 -3.89843 64.1359 6.22456 78.6974C16.3165 93.2673 32.9903 93.9734 32.9903 93.9734ZM75.7939 142.673C75.7939 142.673 64.3175 132.139 67.4825 114.229C70.6504 96.3306 83.7032 87.5041 83.7032 87.5041C83.7032 87.5041 96.7908 100.154 93.7372 117.609C90.647 135.051 75.7939 142.673 75.7939 142.673ZM107.208 117.341C107.208 117.341 95.0518 127.358 93.5731 145.508C92.1019 163.645 104.505 173.037 104.505 173.037C104.505 173.037 118.547 164.046 119.988 146.375C121.428 128.705 107.208 117.341 107.208 117.341ZM149.288 171.262C152.973 188.621 142.097 201.3 142.097 201.3C142.097 201.3 127.527 195.885 123.742 178.072C119.967 160.257 128.714 147.132 128.714 147.132C128.714 147.132 145.592 153.906 149.288 171.262ZM29.9399 103.539C44.2067 114.744 42.7113 130.262 42.7113 130.262C42.7113 130.262 26.5942 134.535 12.6552 123.599C-1.28097 112.674 0.0330788 94.4897 0.0330788 94.4897C0.0330788 94.4897 15.6393 92.331 29.9399 103.539ZM64.456 164.325C64.456 164.325 62.4867 148.852 46.0878 141.089C29.6841 133.35 14.9659 138.947 14.9659 138.947C14.9659 138.947 17.7137 156.993 33.6972 164.532C49.6806 172.071 64.456 164.325 64.456 164.325ZM66.1724 173.721C84.1217 176.119 90.6523 190.291 90.6523 190.291C90.6523 190.291 78.9339 202.19 61.4308 199.84C43.9408 197.498 35.8886 181.13 35.8886 181.13C35.8886 181.13 48.1996 171.318 66.1724 173.721ZM101.908 200.973C83.8111 200.759 72.7208 211.976 72.7208 211.976C72.7208 211.976 82.6355 227.253 100.288 227.507C117.926 227.709 128.134 214.483 128.134 214.483C128.134 214.483 119.997 201.199 101.908 200.973ZM40.9222 64.6409L49.4177 66.3314C48.737 69.8433 34.3951 153.361 161.079 214.314L157.387 222.13C24.2963 158.122 40.7491 65.5699 40.9222 64.6409Z" fill="url(#paint0_linear)" />
                                        <defs>
                                            <linearGradient id="paint0_linear" x1="70.6897" y1="0.871704" x2="70.6897" y2="227.509" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#DCDDE0" />
                                                <stop offset="1" stop-color="#DCDDE0" stop-opacity="0" />
                                            </linearGradient>
                                        </defs>
                                </svg>'
                            className={styles.detailA}
                            alt="Detalhe a"
                            width={ImgSize.Large_x120 - 20}
                            height={ImgSize.Large_x120 + 20}
                        />
                        <div className={styles.level}>
                            <span>{level}</span>
                        </div>
                        <Image
                            loader={detailBImage}
                            src='
                                <svg width="162" height="227" viewBox="0 0 162 227" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M117.056 55.8947C117.056 55.8947 104.147 47.319 104.554 29.1377C104.95 10.9536 116.512 0.140747 116.512 0.140747C116.512 0.140747 131.362 10.5546 130.96 28.3016C130.567 46.0173 117.056 55.8947 117.056 55.8947ZM101.256 94.8674C101.256 94.8674 85.551 89.2634 80.2141 72.3701C74.8877 55.4795 86.2392 41.2247 86.2392 41.2247C86.2392 41.2247 100.327 48.2615 105.812 65.5968C111.274 82.9369 101.256 94.8674 101.256 94.8674ZM129.012 93.2423C129.012 93.2423 123.009 78.8746 133.386 63.9453C143.756 49.0029 159.326 46.4479 159.326 46.4479C159.326 46.4479 165.901 63.4048 155.778 77.9664C145.686 92.5362 129.012 93.2423 129.012 93.2423ZM86.2084 141.942C86.2084 141.942 97.6848 131.408 94.5197 113.498C91.3518 95.5995 78.299 86.773 78.299 86.773C78.299 86.773 65.2114 99.423 68.265 116.878C71.3553 134.32 86.2084 141.942 86.2084 141.942ZM54.7962 116.61C54.7962 116.61 66.9525 126.627 68.4312 144.777C69.9023 162.914 57.499 172.306 57.499 172.306C57.499 172.306 43.4572 163.315 42.0166 145.644C40.576 127.974 54.7962 116.61 54.7962 116.61ZM12.7146 170.531C9.02896 187.89 19.9052 200.569 19.9052 200.569C19.9052 200.569 34.4752 195.154 38.2602 177.341C42.0348 159.526 33.2887 146.401 33.2887 146.401C33.2887 146.401 16.4105 153.175 12.7146 170.531ZM132.06 102.808C117.794 114.013 119.289 129.531 119.289 129.531C119.289 129.531 135.406 133.804 149.345 122.868C163.281 111.943 161.967 93.7586 161.967 93.7586C161.967 93.7586 146.361 91.5999 132.06 102.808ZM97.5463 163.593C97.5463 163.593 99.5155 148.121 115.914 140.358C132.318 132.619 147.036 138.216 147.036 138.216C147.036 138.216 144.289 156.261 128.305 163.801C112.322 171.34 97.5463 163.593 97.5463 163.593ZM95.8328 172.99C77.8836 175.388 71.353 189.56 71.353 189.56C71.353 189.56 83.0714 201.459 100.575 199.109C118.065 196.767 126.117 180.399 126.117 180.399C126.117 180.399 113.806 170.587 95.8328 172.99ZM60.0942 200.241C78.1911 200.028 89.2815 211.245 89.2815 211.245C89.2815 211.245 79.3667 226.522 61.7143 226.776C44.0759 226.978 33.8684 213.751 33.8684 213.751C33.8684 213.751 42.0049 200.468 60.0942 200.241ZM121.081 63.9098L112.586 65.6003C113.266 69.1122 127.608 152.63 0.923828 213.583L4.61658 221.399C137.707 157.391 121.254 64.8388 121.081 63.9098Z" fill="url(#paint0_linear)" />
                                    <defs>
                                        <linearGradient id="paint0_linear" x1="71.6122" y1="0.140747" x2="71.6122" y2="226.778" gradientUnits="userSpaceOnUse">
                                            <stop stop-color="#DCDDE0" />
                                            <stop offset="1" stop-color="#DCDDE0" stop-opacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>'
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
                                loader={twitterImage}
                                src='
                                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 1.00005C21.0424 1.67552 19.9821 2.19216 18.86 2.53005C18.2577 1.83756 17.4573 1.34674 16.567 1.12397C15.6767 0.901206 14.7395 0.957242 13.8821 1.2845C13.0247 1.61176 12.2884 2.19445 11.773 2.95376C11.2575 3.71308 10.9877 4.61238 11 5.53005V6.53005C9.24263 6.57561 7.50127 6.18586 5.93101 5.39549C4.36074 4.60513 3.01032 3.43868 2 2.00005C2 2.00005 -2 11 7 15C4.94053 16.398 2.48716 17.099 0 17C9 22 20 17 20 5.50005C19.9991 5.2215 19.9723 4.94364 19.92 4.67005C20.9406 3.66354 21.6608 2.39276 22 1.00005Z" fill="#2AA9E0" />
                                    </svg>'
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