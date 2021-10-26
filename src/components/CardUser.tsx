/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import levelUpImage from '../../public/icons/level.svg'

import Image from 'next/image'

import styles from '../styles/components/CardUser.module.scss'

/* ---------------------------------------------------------------------- */

export function CardUser() {
    const { level, currentExperience, challengesCompleted} = useContext(ChallengesContext)
    const { __username, __avatar_url } = useContext(LoginContext)

    return (
        <div className={styles.cardContainer}>
            <div className={styles.photo}>
                <Image
                    src={__avatar_url}
                    alt="Foto de perfil"
                    className={styles.ProfileImage}
                    width={ImgSize.Medium_x80 - 16}
                    height={ImgSize.Medium_x80 - 16}
                    decoding="async"
                    quality={100}
                    priority
                />
            </div>

            <div className={styles.info}>
                <div className={styles.username}>
                    <strong>{__username}</strong>
                </div>
                <div className={styles.level}>
                    <div>
                        <Image
                            src={levelUpImage}
                            alt="Level"
                            layout="fixed"
                            width={ImgSize.Custom_x10}
                            height={ImgSize.Custom_x10 + 2}
                        />
                    </div>
                    <p>Level</p>
                    <span>{level}</span>
                </div>
            </div>

            <div className={styles.challenges}>
                <span>{challengesCompleted}</span>
                <p>completados</p>
            </div>
            <div className={styles.xp}>
                <span>{currentExperience}</span>
                <p>xp</p>
            </div>
        </div>
    )
}