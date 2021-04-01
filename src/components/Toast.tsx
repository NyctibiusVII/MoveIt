import { ToastContext } from '../contexts/ToastContext'

import { useContext } from 'react'

import Image   from 'next/image'
import Cookies from 'js-cookie'
import styles  from '../styles/components/Toast.module.css'

export function Toast() {
    const { activeToast, selectedToast, percentToClose, fade__, sideSlide__ } = useContext(ToastContext)

    const messages = [
        /* 0 */ `Bem-vindo ao MoveIt ${Cookies.get('__username')}`,
        /* 1 */ `Sorry! Apenas usuários são permitidos`,
        /* 2 */ `Usuário não existe`,
        /* 3 */ `Sessão encerrada com sucesso: Até mais tarde ${Cookies.get('usernameCacheForToast')} 💙`,
    ]
    const stockIconsPatterns = [
        /* 0 */ 'success',
        /* 1 */ 'warn',
        /* 2 */ 'error',
        /* 3 */ 'info',
    ]
    const srcIcons = [
        /* 0 */ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 408.576 408.576" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                    <path d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288 S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6 c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344 c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z" fill="#ffffff"/>
                </svg>`,
        /* 1 */ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    path d="M256,0C115.2,0,0,115.2,0,256s115.2,256,256,256s256-115.2,256-256S396.8,0,256,0z M256,51.2 c28.16,0,48.64,23.04,46.08,51.2L281.6,307.2h-51.2l-20.48-204.8C207.36,74.24,227.84,51.2,256,51.2z M256,460.8 c-28.16,0-51.2-23.04-51.2-51.2c0-28.16,23.04-51.2,51.2-51.2s51.2,23.04,51.2,51.2C307.2,437.76,284.16,460.8,256,460.8z" fill="#ffffff"/>
                /svg>`,
        /* 2 */ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95 c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241 c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30 V317.241z" fill="#ffffff"/>
                </svg>`,
        /* 3 */ `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve">
                    <path xmlns="http://www.w3.org/2000/svg" d="M256,0C114.613,0,0,114.617,0,256c0,141.391,114.613,256,256,256s256-114.609,256-256C512,114.617,397.387,0,256,0z M256,128c17.674,0,32,14.328,32,32c0,17.68-14.326,32-32,32s-32-14.32-32-32C224,142.328,238.326,128,256,128z M304,384h-96 c-8.836,0-16-7.156-16-16c0-8.836,7.164-16,16-16h16v-96h-16c-8.836,0-16-7.156-16-16c0-8.836,7.164-16,16-16h64  c8.836,0,16,7.164,16,16v112h16c8.836,0,16,7.164,16,16C320,376.844,312.836,384,304,384z" fill="#ffffff"/>
                </svg>`,
    ]

    const ToastLoaderImg = () => `./icons/toast-${stockIconsPatterns[Number(selectedToast)]}.svg`
    const ToastSrcIcons  = `${srcIcons[Number(selectedToast)]}`
    const AltIcons       = `Icon ${stockIconsPatterns[Number(selectedToast)]}`
    const imgSize        = 20

    return (
        <>
            { activeToast && (
                <div
                    className={styles.container}
                    style={{
                        backgroundColor: `var(--toast-${stockIconsPatterns[Number(selectedToast)]})`,
                        animation: `${fade__} 0.5s, ${sideSlide__} 0.5s both`,
                        WebkitAnimation: ` ${fade__} 0.5s, ${sideSlide__} 0.5s both`
                    }}
                >
                    <div className={styles.subContainer}>
                        <div className={styles.iconContainer}>
                            <Image
                                loader={ToastLoaderImg}
                                src={ToastSrcIcons}
                                alt={AltIcons}
                                width={imgSize}
                                height={imgSize}
                            />
                        </div>
                        <span>{messages[Number(selectedToast)]}</span>
                    </div>
                    <div className={styles.currentCountdown}>
                        <div
                            style={{
                                width: `${percentToClose}%`,
                                backgroundColor: `var(--toast-${stockIconsPatterns[Number(selectedToast)]})`,
                                filter: `brightness(70%)`
                            }}
                        />
                    </div>
                </div>
            ) }
        </>
    )
}