import { SidebarContext } from '../contexts/SidebarContext'

import { useContext, useEffect, useState } from 'react'

import Link  from 'next/link'
import Image from 'next/image'

import Cookies from 'js-cookie'
import styles  from '../styles/components/FloatingActionButton.module.css'

export function FloatingActionButton() {
    const { activePage, goHome, goLeaderbord, goSettings, goLogin } = useContext(SidebarContext)
    const [ isChecked, setIsChecked ] = useState(false)

    /* ------- */ const [ activeFAB, setActiveFAB ] = useState(false)
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     let mounted = true
    /* ------- */
    /* ------- */     Promise
    /* ------- */         .resolve(Cookies.get('sidebar&FAB'))
    /* ------- */         .then(resp => mounted && setActiveFAB(resp === 'enable' ? true : false))
    /* ------- */         .catch(err => console.log(err))
    /* ------- */
    /* ------- */     return () => { mounted = false } // - Cleanup()
    /* ------- */ }, [ goHome, goLeaderbord, goSettings, goLogin, [] ])

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

    const imgSize = 16 // - 24px
    const plusLoaderImg       = () => `./icons/plus.svg`
    const homeLoaderImg       = () => `./icons/home.svg`
    const leaderbordLoaderImg = () => `./icons/award.svg`
    const settingsLoaderImg   = () => `./icons/settings.svg`

    return (
        <>
            { activeFAB && (
                <>
                    <div className={`${styles.floatingActionButtonContainerMenu}`}>
                        <button type="button" className={`${styles.floatingActionButtonMenu} ${checked}`} onClick={activeFloatActionButton} aria-label="Float action button menu">
                            <Image
                                loader={plusLoaderImg}
                                src='
                                    <svg
                                        data-name="plus"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                            <polygon
                                                points="511.99 308.25 511.99 203.75 308.25 203.75 308.25 0 203.75 0 203.75 203.75 0.01 203.75 0.01 308.25 203.75 308.25 203.75 511.99 308.25 512 308.25 308.25 511.99 308.25"
                                                fill="#FFFFFF"/>
                                    </svg>'
                                alt="Home"
                                width={imgSize}
                                height={imgSize}
                            />
                        </button>
                    </div>
                    <div className={`${styles.floatingActionButtonContainerItens} ${enabled}`}>
                        <Link href="/">
                            <button type="button" id='FABhome' className={`${styles.FABhome} ${homePage}`} onClick={goHome} aria-label="Ir para home">
                                <Image
                                  loader={homeLoaderImg}
                                  src='
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M4 12L16 2.66663L28 12V26.6666C28 27.3739 27.719 28.0522 27.219 28.5522C26.7189 29.0523 26.0406 29.3333 25.3333 29.3333H6.66667C5.95942 29.3333 5.28115 29.0523 4.78105 28.5522C4.28095 28.0522 4 27.3739 4 26.6666V12Z"
                                              stroke="#5965E0"
                                              stroke-width="2.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                          <path
                                              d="M12 29.3333V16H20V29.3333"
                                              stroke="#5965E0"
                                              stroke-width="2.5"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"/>
                                    </svg>'
                                  alt="Home"
                                  width={imgSize}
                                  height={imgSize}
                                />
                            </button>
                        </Link>
                        <Link href="/leaderbord">
                            <button type="button" id='FABleaderbord' className={`${styles.FABleaderbord} ${leaderbordPage}`} onClick={goLeaderbord} aria-label="Ir para leaderbord">
                                <Image
                                  loader={leaderbordLoaderImg}
                                  src='
                                    <svg
                                        width="32"
                                        height="32"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.0001 19.9999C21.1547 19.9999 25.3334 15.8212 25.3334 10.6666C25.3334 5.51193 21.1547 1.33325 16.0001 1.33325C10.8454 1.33325 6.66675 5.51193 6.66675 10.6666C6.66675 15.8212 10.8454 19.9999 16.0001 19.9999Z"
                                                stroke="#5965E0"
                                                stroke-width="2.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path
                                                d="M10.9466 18.5199L9.33325 30.6666L15.9999 26.6666L22.6666 30.6666L21.0533 18.5066"
                                                stroke="#5965E0"
                                                stroke-width="2.5"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                    </svg>'
                                  alt="Entre os melhores"
                                  width={imgSize}
                                  height={imgSize}
                                />
                            </button>
                        </Link>
                        <Link href="/settings">
                            <button type="button" id='FABsettings' className={`${styles.FABsettings} ${settingsPage}`} onClick={goSettings} aria-label="Ir para settings">
                                <Image
                                  loader={settingsLoaderImg}
                                  src='
                                    <?xml version="1.0"?>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink"
                                        xmlns:svgjs="http://svgjs.com/svgjs"
                                        version="1.1"
                                        width="32"
                                        height="32"
                                        x="0" y="0"
                                        viewBox="0 0 512 512"
                                        style="enable-background:new 0 0 512 512"
                                        xml:space="preserve">
                                            <g>
                                                <path
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    d="m272.066 512h-32.133c-25.989 0-47.134-21.144-47.134-47.133v-10.871c-11.049-3.53-21.784-7.986-32.097-13.323l-7.704 7.704c-18.659 18.682-48.548 18.134-66.665-.007l-22.711-22.71c-18.149-18.129-18.671-48.008.006-66.665l7.698-7.698c-5.337-10.313-9.792-21.046-13.323-32.097h-10.87c-25.988 0-47.133-21.144-47.133-47.133v-32.134c0-25.989 21.145-47.133 47.134-47.133h10.87c3.531-11.05 7.986-21.784 13.323-32.097l-7.704-7.703c-18.666-18.646-18.151-48.528.006-66.665l22.713-22.712c18.159-18.184 48.041-18.638 66.664.006l7.697 7.697c10.313-5.336 21.048-9.792 32.097-13.323v-10.87c0-25.989 21.144-47.133 47.134-47.133h32.133c25.989 0 47.133 21.144 47.133 47.133v10.871c11.049 3.53 21.784 7.986 32.097 13.323l7.704-7.704c18.659-18.682 48.548-18.134 66.665.007l22.711 22.71c18.149 18.129 18.671 48.008-.006 66.665l-7.698 7.698c5.337 10.313 9.792 21.046 13.323 32.097h10.87c25.989 0 47.134 21.144 47.134 47.133v32.134c0 25.989-21.145 47.133-47.134 47.133h-10.87c-3.531 11.05-7.986 21.784-13.323 32.097l7.704 7.704c18.666 18.646 18.151 48.528-.006 66.665l-22.713 22.712c-18.159 18.184-48.041 18.638-66.664-.006l-7.697-7.697c-10.313 5.336-21.048 9.792-32.097 13.323v10.871c0 25.987-21.144 47.131-47.134 47.131zm-106.349-102.83c14.327 8.473 29.747 14.874 45.831 19.025 6.624 1.709 11.252 7.683 11.252 14.524v22.148c0 9.447 7.687 17.133 17.134 17.133h32.133c9.447 0 17.134-7.686 17.134-17.133v-22.148c0-6.841 4.628-12.815 11.252-14.524 16.084-4.151 31.504-10.552 45.831-19.025 5.895-3.486 13.4-2.538 18.243 2.305l15.688 15.689c6.764 6.772 17.626 6.615 24.224.007l22.727-22.726c6.582-6.574 6.802-17.438.006-24.225l-15.695-15.695c-4.842-4.842-5.79-12.348-2.305-18.242 8.473-14.326 14.873-29.746 19.024-45.831 1.71-6.624 7.684-11.251 14.524-11.251h22.147c9.447 0 17.134-7.686 17.134-17.133v-32.134c0-9.447-7.687-17.133-17.134-17.133h-22.147c-6.841 0-12.814-4.628-14.524-11.251-4.151-16.085-10.552-31.505-19.024-45.831-3.485-5.894-2.537-13.4 2.305-18.242l15.689-15.689c6.782-6.774 6.605-17.634.006-24.225l-22.725-22.725c-6.587-6.596-17.451-6.789-24.225-.006l-15.694 15.695c-4.842 4.843-12.35 5.791-18.243 2.305-14.327-8.473-29.747-14.874-45.831-19.025-6.624-1.709-11.252-7.683-11.252-14.524v-22.15c0-9.447-7.687-17.133-17.134-17.133h-32.133c-9.447 0-17.134 7.686-17.134 17.133v22.148c0 6.841-4.628 12.815-11.252 14.524-16.084 4.151-31.504 10.552-45.831 19.025-5.896 3.485-13.401 2.537-18.243-2.305l-15.688-15.689c-6.764-6.772-17.627-6.615-24.224-.007l-22.727 22.726c-6.582 6.574-6.802 17.437-.006 24.225l15.695 15.695c4.842 4.842 5.79 12.348 2.305 18.242-8.473 14.326-14.873 29.746-19.024 45.831-1.71 6.624-7.684 11.251-14.524 11.251h-22.148c-9.447.001-17.134 7.687-17.134 17.134v32.134c0 9.447 7.687 17.133 17.134 17.133h22.147c6.841 0 12.814 4.628 14.524 11.251 4.151 16.085 10.552 31.505 19.024 45.831 3.485 5.894 2.537 13.4-2.305 18.242l-15.689 15.689c-6.782 6.774-6.605 17.634-.006 24.225l22.725 22.725c6.587 6.596 17.451 6.789 24.225.006l15.694-15.695c3.568-3.567 10.991-6.594 18.244-2.304z"
                                                    fill="#5965e0"
                                                    data-original="#000000"
                                                    style=""/>
                                                <path xmlns="http://www.w3.org/2000/svg"
                                                    d="m256 367.4c-61.427 0-111.4-49.974-111.4-111.4s49.973-111.4 111.4-111.4 111.4 49.974 111.4 111.4-49.973 111.4-111.4 111.4zm0-192.8c-44.885 0-81.4 36.516-81.4 81.4s36.516 81.4 81.4 81.4 81.4-36.516 81.4-81.4-36.515-81.4-81.4-81.4z"
                                                    fill="#5965e0"
                                                    data-original="#000000"
                                                    style=""/>
                                            </g>
                                    </svg>'
                                  alt="Configurações"
                                  width={imgSize}
                                  height={imgSize}
                                />
                            </button>
                        </Link>
                    </div>
                </>
            ) }
        </>
    )
}