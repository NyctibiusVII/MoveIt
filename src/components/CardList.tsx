/* Import ---------------------------------------------------------------------- */ // - x70

import { CardUser } from './CardUser'

import styles from '../styles/components/CardList.module.css'

/* ---------------------------------------------------------------------- */

export function CardList() {
    return (
        <>
            <div className={styles.cardListContainer}>
                <div className={styles.you}>
                    <p>VOCÊ</p>
                </div>
                <div className={styles.void} />
                <div className={styles.challenges}>
                    <p>DESAFIOS</p>
                </div>
                <div className={styles.experience}>
                    <p>EXPERIÊNCIA</p>
                </div>
            </div>

            <CardUser />
        </>
    )
}