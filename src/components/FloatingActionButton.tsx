/* Import ---------------------------------------------------------------------- */ // - x70

import { SidebarContext } from '../contexts/SidebarContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'
import { ImgSize } from '../interface/imgSize'

import plusImage       from '../../public/icons/plus.svg'
import homeImage       from '../../public/icons/home.svg'
import leaderbordImage from '../../public/icons/award.svg'
import settingsImage   from '../../public/icons/settings.svg'

import Cookies from 'js-cookie'

import Image from 'next/image'
import Link  from 'next/link'

import styles from '../styles/components/FloatingActionButton.module.scss'

/* ---------------------------------------------------------------------- */

export function FloatingActionButton() {
    const { activePage, goHome, goLeaderbord, goSettings, goLogin } = useContext(SidebarContext)
    const [ isChecked, setIsChecked ] = useState(false)

    /* ------- */ const [ activeFAB, setActiveFAB ] = useState(Boolean)
    /* ------- */ useEffect(() => {
    /* ------- */     setActiveFAB(Cookies.get('sidebar&FAB') === 'enable')
    /* ------- */ }, [ goLogin ])

    const homePage       = activePage  === 'home'       ? 'activePageButton' : '' // - inactivePageButton
    const leaderbordPage = activePage  === 'leaderbord' ? 'activePageButton' : '' // - inactivePageButton
    const settingsPage   = activePage  === 'settings'   ? 'activePageButton' : '' // - inactivePageButton
    const loginPage      = activeFAB   === false        ? 'activePageButton' : '' // - inactivePageButton

    const activeFloatActionButton = () => { isChecked ? setIsChecked(false) : setIsChecked(true) }
    const checked = isChecked ? 'FABchecked' : '' // - noFABchecked
    const enabled = isChecked ? 'FABenabled' : '' // - noFABenabled

    /*
        console.info(`
            Home       : ${activeFAB === false ? '-'   : homePage       === '' ? '-' : homePage      }
            Leaderbord : ${activeFAB === false ? '-'   : leaderbordPage === '' ? '-' : leaderbordPage}
            Settings   : ${activeFAB === false ? '-'   : settingsPage   === '' ? '-' : settingsPage  }
            Login      : ${activeFAB === true  ? '-'   : loginPage}
            Sidebar    : ${activeFAB === true  ? 'ON'  : 'OFF'    }
        `) // - Look info
        console.info(`
            Checked : ${checked === '' ? '-' : checked === 'FABchecked'}
            Active  : ${enabled === '' ? '-' : enabled === 'FABenabled'}
        `) // - Look info
    */

    return (
        <>
            { activeFAB && (
                <>
                    <div className={`${styles.floatingActionButtonContainerMenu}`}>
                        <button type="button" className={`${styles.floatingActionButtonMenu} ${checked}`} onClick={activeFloatActionButton} aria-label="Float action button menu">
                            <Image
                                src={plusImage}
                                alt="Home"
                                width={ImgSize.Mini_x16}
                                height={ImgSize.Mini_x16}
                            />
                        </button>
                    </div>
                    <div className={`${styles.floatingActionButtonContainerItens} ${enabled}`}>
                        <Link href="/" passHref>
                            <button type="button" id='FABhome' className={`${styles.FABhome} ${homePage}`} onClick={goHome} aria-label="Ir para home">
                                <Image
                                    src={homeImage}
                                    alt="Home"
                                    width={ImgSize.Mini_x16}
                                    height={ImgSize.Mini_x16}
                                />
                            </button>
                        </Link>
                        <Link href="/leaderbord" passHref>
                            <button type="button" id='FABleaderbord' className={`${styles.FABleaderbord} ${leaderbordPage}`} onClick={goLeaderbord} aria-label="Ir para leaderbord">
                                <Image
                                    src={leaderbordImage}
                                    alt="Entre os melhores"
                                    width={ImgSize.Mini_x16}
                                    height={ImgSize.Mini_x16}
                                />
                            </button>
                        </Link>
                        <Link href="/settings" passHref>
                            <button type="button" id='FABsettings' className={`${styles.FABsettings} ${settingsPage}`} onClick={goSettings} aria-label="Ir para settings">
                                <Image
                                    src={settingsImage}
                                    alt="Configurações"
                                    width={ImgSize.Mini_x16}
                                    height={ImgSize.Mini_x16}
                                />
                            </button>
                        </Link>
                    </div>
                </>
            ) }
        </>
    )
}