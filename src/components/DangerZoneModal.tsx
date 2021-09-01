/* Import ---------------------------------------------------------------------- */ // - x70

import { DangerZoneContext } from '../contexts/DangerZoneContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'

import Cookies from 'js-cookie'

import Link from 'next/link'

import defaultModalStyles from '../styles/components/DefaultModal.module.css'
import styles             from '../styles/components/DangerZoneModal.module.css'

/* ---------------------------------------------------------------------- */

const preventDefault = (f: any) => (e: any) => {
    e.preventDefault()
    f(e)
}

export function DangerZoneModal() {
    const {
        openDangerZoneModal,
        closeDangerZoneModal,
        deleteCookiesData,
        deleteDataBase
    } = useContext(DangerZoneContext)

    const COOKIES = 'COOKIES', cookie   = 315151195
    const DATA    = 'DATA',    dataBase = 4120121195

    /* --------- */ const [ whichDeleteText,          setWhichDeleteText ]          = useState(null)
    /* --------- */ const [ whichDeleteTextLowerCase, setWhichDeleteTextLowerCase ] = useState(null)
    /* --------- */ const [ pattern,                  setPattern ]                  = useState(null)
    /* --------- */
    /* --------- */ useEffect(() => {
    /* --------- */     let mounted = true
    /* --------- */
    /* --------- */     Promise
    /* --------- */         .resolve(Cookies.get('whichDelete'))
    /* --------- */         .then(resp => {
    /* --------- */                 if (mounted) {
    /* --------- */                     switch (resp) {
    /* --------- */                         case String(cookie):
    /* --------- */                             setWhichDeleteText(COOKIES)
    /* --------- */
    /* --------- */                             setWhichDeleteTextLowerCase(COOKIES.toLocaleLowerCase())
    /* --------- */                             setPattern('[dD][eE][lL][eE][tT][eE]-[cC][oO][oO][kK][iI][eE][sS]')
    /* --------- */                             break;
    /* --------- */                         case String(dataBase):
    /* --------- */                             setWhichDeleteText(DATA)
    /* --------- */
    /* --------- */                             setWhichDeleteTextLowerCase(DATA.toLocaleLowerCase())
    /* --------- */                             setPattern('[dD][eE][lL][eE][tT][eE]-[dD][aA][tT][aA]')
    /* --------- */                             break;
    /* --------- */                         default:
    /* --------- */                             alert('Ocorreu um problema\nPor favor, recarregue a página e tente novamente.')
    /* --------- */                             console.error('Invalid value:\n'+resp)
    /* --------- */                             break;
    /* --------- */                     }
    /* --------- */                 }
    /* --------- */         })
    /* --------- */         .catch(err => console.log(err))
    /* --------- */
    /* --------- */     return () => { mounted = false } // - Cleanup()
    /* --------- */ }, [ openDangerZoneModal ])

    const [ result, setResult ] = useState('')
    const handleParam = (setValue: any) => (e: any) => setValue(e.target.value)

    const handleSubmit = preventDefault(() => {
        switch (result.toUpperCase()) {
            case 'DELETE-COOKIES':
                deleteCookiesData()
                break;
            case 'DELETE-DATA':
                if (Number(Cookies.get('__isLogged')) === 1) {
                    deleteDataBase()
                } else {
                    alert('Erro ao excluir:\nVocê não esta logado para executar esta ação!')
                    closeDangerZoneModal()
                    console.error('Error deleting:\nYou are not logged in to perform this action!')
                }
                break;
            default:
                alert('Ocorreu um problema\nPor favor, recarregue a página e tente novamente.')
                console.error('Invalid value:\n'+result.toUpperCase())
                break;
        }
    })

    return(
        <div className={defaultModalStyles.overlay}>
            <div className={`${styles.container} ${defaultModalStyles.container}`}>
                <header>
                    <div>
                        <strong>Você tem certeza absoluta?</strong>
                    </div>
                    <button type="button" className={styles.close} onClick={closeDangerZoneModal}>
                        <p>✖</p>
                    </button>
                </header>

                <div>
                    {(whichDeleteText === COOKIES &&
                        <div className={styles.description}>
                            <p style={{
                                fontSize: '1.03rem',
                                fontWeight: 500,

                                marginBottom: '0.3rem'
                            }}>O que são cookies:</p>
                            <p>Cookies são arquivos criados pelos websites que você visita. Eles tornam sua experiência on-line mais fácil, economizando informações de navegação. Com os cookies, os sites podem manter você conectado, lembrar suas preferências do site e fornecer conteúdo relevante localmente.</p>
                            <small>- Por Google</small>
                            <br /><br />
                            <p>para saber mais acesse</p>
                            <div style={{
                                maxWidth: 'fit-content',

                                overflow: 'hidden'
                            }}>
                                <Link href="https://support.google.com/chrome/answer/95647">
                                    <a target="_blank" rel="noreferrer">
                                        <p style={{color: 'cornflowerblue'}}>
                                            <u>
                                            https://support.google.com/chrome/answer/95647
                                        </u>
                                        </p>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ) || (whichDeleteText === DATA &&
                        <div className={styles.description}>
                            <p>Essa ação não pode ser desfeita. Isso excluirá permanentemente os seus dados:</p>
                            <p>Nome, Level, Experiência, Desafios completados e removerá seu ranking da Leaderbord.</p>
                        </div>
                    )}
                    <p className={styles.typeText}>Digite <strong>DELETE-{whichDeleteText}</strong> para confirmar.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            id="verify"
                            name="verify"
                            type="text"
                            onChange={handleParam(setResult)}
                            className={styles.inputTypeText}
                            pattern={pattern}
                            autoComplete="off"
                            required />
                        <button type="submit" className={styles.btnSubmit}>
                            <span>Eu entendo as consequências, deletar {whichDeleteTextLowerCase}</span>
                            <span>Deletar {whichDeleteTextLowerCase}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}