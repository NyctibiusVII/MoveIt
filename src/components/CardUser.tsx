/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import {
    useContext
} from 'react'
import { ImgSize } from '../interface/imgSize'
import { UsersLeaderboard } from '../interface/user'

import levelUpImage from '../../public/icons/level.svg'

import Image from 'next/image'

import styles from '../styles/components/CardUser.module.scss'

/* ---------------------------------------------------------------------- */

interface CardUserProps {
    page: 'leaderbord' | 'settings'
    usersLeaderboard?: UsersLeaderboard | null
}

export function CardUser({ page='leaderbord', usersLeaderboard }: CardUserProps) {
    const { level, currentExperience, challengesCompleted } = useContext(ChallengesContext)
    const { __username, __avatar_url } = useContext(LoginContext)

    const profileImage = ({ src, width, quality }) => `${src || (page === 'leaderbord' ? usersLeaderboard.avatar_url : __avatar_url)}?s=${width || ImgSize.Medium_x80 - 16}&q=${quality || 75}&v=4`

    return (
        <>
            { page === 'leaderbord' ? (
                <div id={styles.usersLeaderboard} className={styles.cardContainer}>
                    { usersLeaderboard.position === 1 ?
                        <div id='LEADER_P' className={styles.position}>
                            <span id='LEADER_S'></span>
                        </div>
                    : (
                        <div className={styles.position}>
                            <span>{usersLeaderboard.position}°</span>
                        </div>
                    ) }

                    <div className={styles.user}>
                        <div className={styles.photo}>
                            <Image
                                loader={profileImage}
                                src={usersLeaderboard.avatar_url}
                                alt="Foto de perfil"
                                className={styles.ProfileImage}
                                width={ImgSize.Medium_x80 - 16}
                                height={ImgSize.Medium_x80 - 16}
                                placeholder="blur"
                                decoding="async"
                                blurDataURL={usersLeaderboard.avatar_url}
                                priority
                            />
                        </div>

                        <div className={styles.info}>
                            <div className={styles.username}>
                                <strong>{usersLeaderboard.username}</strong>
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
                                <span>{usersLeaderboard.level}</span>
                            </div>
                        </div>

                        <div className={styles.challenges}>
                            <span>{usersLeaderboard.challenges_completed}</span>
                            <p>completados</p>
                        </div>
                        <div className={styles.xp}>
                            <span>{usersLeaderboard.current_experience}</span>
                            <p>xp</p>
                        </div>
                    </div>
                    <style jsx>{`
                        span#LEADER_S::before { content: 'LEADER'; }
                        span#LEADER_S {
                            width: 0.55rem;

                            font-family: monospace;
                            font-weight: bold;

                            word-break: break-all;
                            white-space: break-spaces !important;
                        }

                        @media (min-width: 821px) {
                            span#LEADER_S::before { content:   ''; }
                            span#LEADER_S {
                                width: initial;

                                font: 400 1rem "inter", sans-serif;
                                font-weight: initial;
                            }
                            span#LEADER_S::after  { content: '1°'; }
                        }
                    `}</style>
                </div>
            ) : (
                <div className={styles.cardContainer}>
                    <div className={styles.user}>
                        <div className={styles.photo}>
                            <Image
                                loader={profileImage}
                                src={__avatar_url}
                                alt="Foto de perfil"
                                className={styles.ProfileImage}
                                width={ImgSize.Medium_x80 - 16}
                                height={ImgSize.Medium_x80 - 16}
                                placeholder="blur"
                                decoding="async"
                                blurDataURL={__avatar_url}
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
                </div>
            )}
        </>
    )
}