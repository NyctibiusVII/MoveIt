/* Import ---------------------------------------------------------------------- */ // - x70

import { DangerZoneContext } from '../contexts/DangerZoneContext'
import { LoginContext }      from '../contexts/LoginContext'
import { SidebarContext }    from '../contexts/SidebarContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'

import Cookies from 'js-cookie'

import styles from '../styles/components/DangerZone.module.css'

/* ---------------------------------------------------------------------- */

export function DangerZone() {
    const { openDangerZoneModal } = useContext(DangerZoneContext)
    const { logout }              = useContext(LoginContext)
    const { goSettings }          = useContext(SidebarContext)

    const cookie   = 315151195
    const dataBase = 4120121195

    const OPEN_MODAL_deleteDataFromCookies = () => {
        Cookies.set('whichDelete', String(cookie))
        openDangerZoneModal()
    }
    const OPEN_MODAL_deleteDataFromBD = () => {
        Cookies.set('whichDelete', String(dataBase))
        openDangerZoneModal()
    }

    /* --------- */ const [ isLogged, setIsLogged ] = useState(Boolean)
    /* --------- */
    /* --------- */ useEffect(() => {
    /* --------- */     let mounted = true
    /* --------- */
    /* --------- */     Promise
    /* --------- */         .resolve(Number(Cookies.get('__isLogged')))
    /* --------- */         .then(resp => mounted && setIsLogged(resp === 1 ? true : false))
    /* --------- */         .catch(err => console.log(err))
    /* --------- */
    /* --------- */     return () => { mounted = false } // - Cleanup()
    /* --------- */ }, [ logout, goSettings, [] ])

    return (
        <div className={styles.containerDangerZone}>
            <ul>
                <li>
                    <div className={styles.description}>
                        <strong>DELETAR COOKIES</strong>
                        <p>A exclusão dos cookies causara a perca de suas
                            preferências salvas e você precisará fazer login
                            novamente.
                        </p>
                    </div>
                    <div className={styles.dangerButton}>
                        <button onClick={OPEN_MODAL_deleteDataFromCookies}>
                            DELETAR
                        </button>
                    </div>
                </li>
                { isLogged && (
                    <li>
                        <div className={styles.description}>
                            <strong>DELETAR DADOS</strong>
                            <p>Depois de excluir suas informações do banco de
                                dados, não há como voltar atrás. Por favor,
                                esteja certo.
                            </p>
                        </div>
                        <div className={styles.dangerButton}>
                            <button onClick={OPEN_MODAL_deleteDataFromBD}>
                                DELETAR
                            </button>
                        </div>
                    </li>
                ) }
            </ul>
        </div>
    )
}