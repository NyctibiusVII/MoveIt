/* Import ---------------------------------------------------------------------- */ // - x70

import { ToastContext } from '../contexts/ToastContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import Cookies from 'js-cookie'

import Image from 'next/image'

import styles from '../styles/components/Toast.module.css'

/* ---------------------------------------------------------------------- */

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

    const ToastImage = () => `/icons/toast-${stockIconsPatterns[Number(selectedToast)]}.svg`
    const AltIcons   = `Icon ${stockIconsPatterns[Number(selectedToast)]}`

    return (
        <>
            { activeToast && (
                <div
                    className={styles.container}
                    style={{
                        backgroundColor: `var(--toast-${stockIconsPatterns[Number(selectedToast)]})`,
                        animation:       `${fade__} 0.5s, ${sideSlide__} 0.5s both`,
                        WebkitAnimation: `${fade__} 0.5s, ${sideSlide__} 0.5s both`
                    }}
                >
                    <div className={styles.subContainer}>
                        <div className={styles.iconContainer}>
                            <Image
                                src={ToastImage()}
                                alt={AltIcons}
                                width={ImgSize.Little_x20}
                                height={ImgSize.Little_x20}
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