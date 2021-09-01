/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'

import levelImage from '../../public/icons/level.svg'

import Image    from 'next/image'

import styles from '../styles/components/Profile.module.css'

/* ---------------------------------------------------------------------- */

export function Profile() {
    const { level } = useContext(ChallengesContext)
    const { __username, __avatar_url } = useContext(LoginContext)

    const profileImage = ({ src, width, quality }) => `${__avatar_url}/${src}?w=${width}&q=${quality || 100}`

    return (
        <div className={styles.profileContainer}>
            <Image
                loader={profileImage}
                src={__avatar_url}
                alt="Foto de perfil"
                width={ImgSize.Medium_x80}
                height={ImgSize.Medium_x80}
                placeholder="blur"
                blurDataURL={__avatar_url}
                decoding="async"
                priority
            />
            <div className={styles.separation}>
                <strong>{__username}</strong>
                <div className={styles.levelContainer}>
                    <div className={styles.levelImage}>
                        <Image
                            src={levelImage}
                            alt="Level"
                            width={ImgSize.Mini_x16 - 2}
                            height={ImgSize.Mini_x16}
                        />
                    </div>
                    <p>Level {level}</p>
                </div>
            </div>
        </div>
    )
}