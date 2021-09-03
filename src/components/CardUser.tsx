/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import levelImage from '../../public/icons/level.svg'

import Image from 'next/image'

import styles from '../styles/components/CardUser.module.css'

/* ---------------------------------------------------------------------- */

export function CardUser() {
    const { level, currentExperience, challengesCompleted} = useContext(ChallengesContext)
    const { __username, __avatar_url } = useContext(LoginContext)

    return (
        <div className={styles.cardContainer}>
            <div>
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
                <div className={styles.spaceSeparation}>
                    <div className={`${styles.cardUsername} cardUsername`}>
                        <strong>{__username}</strong>
                    </div>
                    <div className={styles.levelContainer}>
                        <div className={styles.levelImage}>
                            <Image
                                src={levelImage}
                                alt="Level"
                                width={ImgSize.Micro_x12}
                                height={ImgSize.Micro_x12 + 2}
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