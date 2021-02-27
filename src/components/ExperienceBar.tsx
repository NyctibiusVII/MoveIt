import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts'

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)
    const percentToNextLevel = Math.round((currentExperience * 100)) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}/>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                    <div className={styles.arrowExperience}></div>
                    {currentExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}