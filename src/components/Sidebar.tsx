/* Import ---------------------------------------------------------------------- */ // - x70

import { SidebarContext } from '../contexts/SidebarContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'
import { ImgSize } from '../interface/imgSize'

import logoImage       from '../../public/icons/logo-bar.svg'
import homeImage       from '../../public/icons/home.svg'
import leaderbordImage from '../../public/icons/award.svg'
import settingsImage   from '../../public/icons/settings.svg'

import Cookies from 'js-cookie'

import Image from 'next/image'
import Link  from 'next/link'

import styles from '../styles/components/Sidebar.module.scss'

/* ---------------------------------------------------------------------- */

export function Sidebar() {
    const { activePage, goHome, goLeaderbord, goSettings, goLogin } = useContext(SidebarContext)

    /* ------- */ const [ activeSidebar, setActiveSidebar ] = useState(Boolean)
    /* ------- */ useEffect(() => {
    /* ------- */     setActiveSidebar(Cookies.get('sidebar&FAB') === 'enable')
    /* ------- */ }, [ goLogin ])


    const homePage       = activePage    === 'home'       ? 'activePage' : '' // - inactivePage
    const leaderbordPage = activePage    === 'leaderbord' ? 'activePage' : '' // - inactivePage
    const settingsPage   = activePage    === 'settings'   ? 'activePage' : '' // - inactivePage
    const loginPage      = activeSidebar === false        ? 'activePage' : '' // - inactivePage

    /*
        console.info(`
            Home       : ${activeSidebar === false ? '-'   : homePage       === '' ? '-' : homePage      }
            Leaderbord : ${activeSidebar === false ? '-'   : leaderbordPage === '' ? '-' : leaderbordPage}
            Settings   : ${activeSidebar === false ? '-'   : settingsPage   === '' ? '-' : settingsPage  }
            Login      : ${activeSidebar === true  ? '-'   : loginPage}
            Sidebar    : ${activeSidebar === true  ? 'ON'  : 'OFF'    }
        `) // - Look info
    */

    return (
        <>
            { activeSidebar && (
                <aside className={styles.sidebarContainer}>
                    <div className={styles.subContainer}>
                        <div className={styles.logoContainer}>
                            <Image
                                src={logoImage}
                                alt="Logo"
                                width={ImgSize.Little_x20 + 2}
                                height={ImgSize.Little_x20 + 2}
                                quality={100}
                            />
                        </div>
                        <main className={styles.mainPages}>
                            <Link href="/" passHref>
                                <button type="button" className={`${styles.btnPage} ${homePage}`} onClick={goHome}>
                                    <Image
                                        src={homeImage}
                                        alt="Home"
                                        width={ImgSize.Little_x20 + 2}
                                        height={ImgSize.Little_x20 + 2}
                                    />
                                </button>
                            </Link>
                            <Link href="/leaderbord" passHref>
                                <button type="button" className={`${styles.btnPage} ${leaderbordPage}`} onClick={goLeaderbord}>
                                    <Image
                                        src={leaderbordImage}
                                        alt="Entre os melhores"
                                        width={ImgSize.Little_x20 + 2}
                                        height={ImgSize.Little_x20 + 2}
                                    />
                                </button>
                            </Link>
                        </main>
                        <div className={styles.settingsPageContainer}>
                            <Link href="/settings" passHref>
                                <button type="button" className={`${styles.btnPage} ${settingsPage}`} onClick={goSettings}>
                                    <Image
                                        src={settingsImage}
                                        alt="Configurações"
                                        width={ImgSize.Little_x20 + 2}
                                        height={ImgSize.Little_x20 + 2}
                                    />
                                </button>
                            </Link>
                        </div>
                    </div>
                </aside>
            ) }
        </>
    )
}