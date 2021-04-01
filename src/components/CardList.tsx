import { CardUser } from './CardUser'

import styles  from '../styles/components/CardList.module.css'

export function CardList() {
    return (
        <div className={styles.cardListContainer}>
            <header>
                <p>VOCÊ</p>

                <div>
                    <p>DESAFIOS</p>
                    <p>EXPERIÊNCIA</p>
                </div>
            </header>

            <CardUser />
        </div>
    )
}