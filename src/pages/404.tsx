/* Import ---------------------------------------------------------------------- */ // - x70
import { SidebarContext } from '../contexts/SidebarContext'

import { ImgSize } from '../interface/imgSize'

import {
    useContext
} from 'react'

import tomateImage      from '../../public/tomato.png'
import setaDesktopImage from '../../public/seta2.png'
import setaMobileImage  from '../../public/seta.png'

import Cookies from 'js-cookie'

import Image from 'next/image'
import Head  from 'next/head'
import Link  from 'next/link'

import styles from '../styles/pages/_404.module.css'

/* ---------------------------------------------------------------------- */

export default function _404() {
    Cookies.set('sidebar&FAB', 'disable') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    const { goHome } = useContext(SidebarContext)

    return (
        <div className={styles.container}>
            <Head>
                <title>404 | MoveIt</title>
            </Head>

            <main>
                <h1>Página Não Encontrada</h1>
                <h3>Erro 404</h3>

                <div className={styles.pictures}>
                    <Link href="/" passHref>
                        <button type="button" onClick={goHome} title="Voltar para home" aria-label="Voltar para home">
                            <Image
                                src={tomateImage}
                                alt="404 Image"
                                className={styles._404Image}
                                layout="intrinsic"
                                decoding="async"
                                quality={100}
                                priority
                            />
                        </button>
                    </Link>
                    <Image
                        src={setaDesktopImage}
                        alt="seta"
                        className={styles.setaImgDesktop}
                        width={ImgSize.Large_x120 + 25}
                        height={ImgSize.Large_x120 + 25}
                    />
                    <Image
                        src={setaMobileImage}
                        alt="seta"
                        className={styles.setaImgMobile}
                        width={ImgSize.Large_x120 * 2}
                        height={ImgSize.Large_x120 * 2}
                    />
                </div>
            </main>
        </div>
    )
}