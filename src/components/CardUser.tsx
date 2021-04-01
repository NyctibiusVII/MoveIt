import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import { useContext } from 'react'

import Image from 'next/image'
import styles  from '../styles/components/CardUser.module.css'

export function CardUser() {
    const { level, currentExperience, challengesCompleted} = useContext(ChallengesContext)
    const { __username, __avatar_url } = useContext(LoginContext)

    const levelImage = () => `./icons/level.svg`

    return (
        <div className={styles.cardContainer}>
            <div>
                <img src={`${__avatar_url}`} className={styles.ProfileImage} alt="Foto de perfil" />
                <div className={styles.spaceSeparation}>
                    <div className={`${styles.cardUsername} cardUsername`}>
                        <strong>{__username}</strong>
                    </div>
                    <div className={styles.levelContainer}>
                        <div className={styles.levelImage}>
                            <Image
                                loader={levelImage}
                                src='
                                    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5004 8.72163V15.2719H3.50165V8.72163H0.702148L7.00102 0.708496L13.2999 8.72163H10.5004Z" fill="#4CD62B"/>
                                            <path d="M13.3007 9.44964C13.0978 9.44964 12.8969 9.35866 12.7583 9.18254L6.99975 1.863L1.24188 9.18254C0.996224 9.49476 0.556702 9.53916 0.257156 9.28588C-0.0423906 9.03043 -0.0864815 8.57264 0.157775 8.26186L6.45735 0.253822C6.724 -0.0846074 7.2748 -0.0846074 7.54145 0.253822L13.8417 8.26186C14.0867 8.57264 14.0419 9.03115 13.7423 9.28588C13.6129 9.39578 13.4568 9.44964 13.3007 9.44964Z" fill="#4CD62B"/>
                                            <path d="M3.50017 16C3.11314 16 2.80029 15.6747 2.80029 15.2722V8.72195C2.80029 8.31947 3.11314 7.99414 3.50017 7.99414C3.8872 7.99414 4.20004 8.31947 4.20004 8.72195V15.2722C4.20004 15.6747 3.8872 16 3.50017 16Z" fill="#4CD62B"/>
                                            <path d="M10.4989 15.9997H3.50017C3.11314 15.9997 2.80029 15.6743 2.80029 15.2719C2.80029 14.8694 3.11314 14.5441 3.50017 14.5441H10.4989C10.8859 14.5441 11.1988 14.8694 11.1988 15.2719C11.1988 15.6743 10.8859 15.9997 10.4989 15.9997Z" fill="#4CD62B"/>
                                            <path d="M10.4992 16C10.1122 16 9.79932 15.6747 9.79932 15.2722V8.72195C9.79932 8.31947 10.1122 7.99414 10.4992 7.99414C10.8862 7.99414 11.1991 8.31947 11.1991 8.72195V15.2722C11.1991 15.6747 10.8862 16 10.4992 16Z" fill="#4CD62B"/>
                                            <path d="M3.50056 9.44975H0.700363C0.313332 9.44975 0.000488281 9.12442 0.000488281 8.72195C0.000488281 8.31947 0.313332 7.99414 0.700363 7.99414H3.50056C3.88759 7.99414 4.20043 8.31947 4.20043 8.72195C4.20043 9.12442 3.88759 9.44975 3.50056 9.44975Z" fill="#4CD62B"/>
                                            <path d="M13.3001 9.44975H10.4992C10.1122 9.44975 9.79932 9.12442 9.79932 8.72195C9.79932 8.31947 10.1122 7.99414 10.4992 7.99414H13.3001C13.6871 7.99414 14 8.31947 14 8.72195C14 9.12442 13.6871 9.44975 13.3001 9.44975Z" fill="#4CD62B"/>
                                    </svg>'
                                alt="Level"
                                width={14}
                                height={16}
                            />
                        </div>
                        <p>Level</p>
                        <span>{level}</span>
                    </div>
                </div>
            </div>

            <div className={styles.containerChallengesAndExperience}>
                <div className={styles.challenges}>
                    <div>
                        <span>{challengesCompleted}</span>&nbsp;<p>completados</p>
                    </div>
                </div>

                <div className={styles.experience}>
                    <div>
                        <span>{currentExperience}</span>&nbsp;<p>xp</p>
                    </div>
                </div>
            </div>
        </div>
    )
}