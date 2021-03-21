import { ChallengesContext } from '../contexts/ChallengesContexts'

import { useContext } from 'react'

import styles from '../styles/components/ExperienceBar.module.css'

var toType = function(obj: any) {return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)
    let percentToNextLevel = Math.round((currentExperience * 100)) / experienceToNextLevel
    percentToNextLevel = toType(percentToNextLevel) === "number" ? percentToNextLevel : 0

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