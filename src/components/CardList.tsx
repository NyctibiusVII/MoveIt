/* Import ---------------------------------------------------------------------- */ // - x70

import { CardUser } from './CardUser'

import { Key } from 'react'
import { User, UserAPI, UsersLeaderboard } from '../interface/user'

import styles from '../styles/components/CardList.module.scss'

/* ---------------------------------------------------------------------- */

interface CardListProps {
    page: 'leaderbord' | 'settings'
    users?: UserAPI | null
}

export function CardList(props: CardListProps) {
    if (props.page === 'leaderbord') {
        var users = JSON.parse(JSON.stringify(props.users)).map((user: User, key: Key): JSX.Element => {
            const usersLeaderboard: UsersLeaderboard = {
                avatar_url: user.avatar_url,
                username:   user.username,
                level:                user.level,
                current_experience:   user.current_experience,
                challenges_completed: user.challenges_completed,
                position:             Number(key) + 1
            }
            return <CardUser key={key} page={props.page} usersLeaderboard={usersLeaderboard} />
        })
    }

    return (
        <>
            <div id={props.page === 'leaderbord' ? `${styles.usersLeaderboard}` : ''} className={styles.cardListContainer}>
                <div className={styles.position}>
                    <p>POSIÇÃO</p>
                </div>
                <div className={styles.you}>
                    <p>{props.page === 'leaderbord' ? 'USUÁRIO' : 'VOCÊ'}</p>
                </div>
                <div className={styles.void} />
                <div className={styles.challenges}>
                    <p>DESAFIOS</p>
                </div>
                <div className={styles.experience}>
                    <p>EXPERIÊNCIA</p>
                </div>
            </div>

            { props.page === 'leaderbord' ? users
            : <CardUser page={props.page} /> }
        </>
    )
}