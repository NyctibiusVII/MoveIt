/* Import ---------------------------------------------------------------------- */ // - x70

import { CookieConsentContext } from '../contexts/CookieConsentContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'

import Cookies from 'js-cookie'

import styles from '../styles/components/CookieConsentModal.module.scss'

/* ---------------------------------------------------------------------- */

export function CookieConsentModal() {
    const { iAgree } = useContext(CookieConsentContext)

    /* ------- */ const [ activeCookieConsentModal, setActiveCookieConsentModal ] = useState(Boolean)
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     setActiveCookieConsentModal(Cookies.get('cookieConsent') !== '1')
    /* ------- */ }, [ iAgree ])

    return (
        <>
            { activeCookieConsentModal && (
                <div className={styles.containerCookieConsentModal}>
                    <ul>
                        <li>
                            <div className={styles.description}>
                                <strong>Este website utiliza cookies</strong>
                                <p>Esse site utiliza cookies para personalizar
                                    e aprimorar sua experiência, além de fornecer
                                    funcionalidades de redes sociais e analisar
                                    o nosso tráfego.
                                </p>
                            </div>
                            <div>
                                <button onClick={iAgree}>
                                    PERMITIR
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            ) }
        </>
    )
}