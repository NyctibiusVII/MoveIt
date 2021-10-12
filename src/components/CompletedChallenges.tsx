/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'

import {
    useContext
} from 'react'

import styles from '../styles/components/CompletedChallenges.module.scss'

/* ---------------------------------------------------------------------- */

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}