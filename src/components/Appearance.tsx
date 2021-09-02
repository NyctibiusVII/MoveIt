/* Import ---------------------------------------------------------------------- */ // - x70

import { AppearanceContext } from '../contexts/AppearanceContext'

import { EmBreve } from '../components/EmBreve'

import {
    useContext,
    useEffect,
    useState
} from 'react'
import { ImgSize }         from '../interface/imgSize'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import successImage from '../../public/icons/toast-success.svg'

import Cookies from 'js-cookie'

import Image   from 'next/image'

import styles from '../styles/components/Appearance.module.css'

/* ---------------------------------------------------------------------- */

export function Appearance() {
    const { changeLight, changeDark, changeCustom } = useContext(AppearanceContext)

    const [ variable,   setVariable ]     = useState('')
    const [ hex,        setHex ]          = useState('')
    const [ foreground, setForeground ]   = useState('')

    const [ copied,     setCopied ]       = useState(false)

    const [ fade__,      setFade__ ]      = useState('')
    const [ sideSlide__, setSideSlide__ ] = useState('')

    const LIGHT_iconCopy = 'var(--white)'
    const DARK_iconCopy  = 'var(--dark-gray)'

    /* ------- */ const [ lightTheme,  setLightTheme ]  = useState('')
    /* ------- */ const [ darkTheme,   setDarkTheme ]   = useState('')
    /* ------- */ const [ customTheme, setCustomTheme ] = useState('')
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     setLightTheme (Cookies.get('activeTheme') === 'light'  ? 'activeTheme' : '') // - inactiveTheme
    /* ------- */     setDarkTheme  (Cookies.get('activeTheme') === 'dark'   ? 'activeTheme' : '') // - inactiveTheme
    /* ------- */     setCustomTheme(Cookies.get('activeTheme') === 'custom' ? 'activeTheme' : '') // - inactiveTheme
    /* ------- */ }, [ changeLight, changeDark, changeCustom ])

    /*
        console.info(`
            lightTheme  : ${lightTheme  === '' ? '-' : lightTheme }
            darkTheme   : ${darkTheme   === '' ? '-' : darkTheme  }
            customTheme : ${customTheme === '' ? '-' : customTheme}
        `) // - Look info
    */

    const f_onCopy = () => {
        setCopied(true)

        setFade__     ('fadeIn')
        setSideSlide__('sideSlideOn')
        setTimeout(() => { setFade__('fadeOut'), setSideSlide__('sideSlideOff') }, 3500)

        setTimeout(() => setCopied(false), 4000)
    }

    const cdL = [
        {
            variable:'--white',
            hex:'#fff',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--background',
            hex:'#f2f3f5',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--gray-line',
            hex:'#dcdde0',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--shadow',
            hex:'#babecc',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--text',
            hex:'#666',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--title',
            hex:'#2e384d',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--text-highlight',
            hex:'#b3b9ff',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--blue',
            hex:'#5965e0',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--green',
            hex:'#4cd62b',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--red',
            hex:'#e83f5b',
            foreground:`${LIGHT_iconCopy}`
        },
    ]
    const cdD = [
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--black',
            hex:'#000',
            foreground:`${LIGHT_iconCopy}`
        },
    ]

    return(
        <div className={styles.container}>
            <div className={styles.light}>
                <div className={styles.rbLight}>
                    <button type="button" className={`${styles.btnTheme} ${lightTheme}`} onClick={changeLight}>
                        <p>LIGHT</p>
                    </button>
                </div>
                <div className={`${styles.cdLight} colorDisplays`}>
                    { cdL.map((values, index) => {
                        return(
                            <CopyToClipboard
                                key={index}
                                text={values.hex}
                                onCopy={() => {
                                    setVariable  (values.variable)
                                    setHex       (values.hex)
                                    setForeground(values.foreground)

                                    f_onCopy()
                                }}
                            >
                                <div title={values.hex} className={styles.cdL}
                                     style={{
                                        backgroundColor: `var(${values.variable})`
                                     }}>
                                    <svg width={ImgSize.Micro_x12} height={ImgSize.Micro_x12} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M32 22h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm-4 0h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2z" fill={values.foreground}/>
                                        <path d="M10 12H3a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-7H10z" fill={values.foreground}/>
                                    </svg>
                                </div>
                            </CopyToClipboard>
                        )
                    }) }
                </div>
            </div>

            <div className={styles.dark}>
                <div className={styles.rbDark}>
                    <button type="button" className={`${styles.btnTheme} ${darkTheme}`} onClick={changeDark}>
                        <p>DARK</p>
                    </button>
                </div>
                <div className={`${styles.cdDark} colorDisplays`}>
                    <EmBreve/>
                </div>
            </div>

            <div className={styles.custom}>
                <div className={styles.rbCustom}>
                    <button type="button" className={`${styles.btnTheme} ${customTheme}`} onClick={changeCustom}>
                        <p>CUSTOM</p>
                    </button>
                </div>
                <div className={styles.cdCustom}>
                    <EmBreve/>
                </div>
            </div>

            { copied && (
                <div
                    className={styles.containerOverlay}
                    style={{
                        animation:       `${fade__} 0.5s, ${sideSlide__} 0.5s both`,
                        WebkitAnimation: `${fade__} 0.5s, ${sideSlide__} 0.5s both`
                    }}>
                    <div className={styles.containerFloatingCopyText}>
                        <div className={styles.iconContainer}>
                        <Image
                            src={successImage}
                            alt="icon success"
                            width={ImgSize.Little_x20}
                            height={ImgSize.Little_x20}
                        />
                    </div>
                        <div className={styles.textContainer}>
                            <p className={styles.copiedClipboardText}>Copiado&nbsp;</p>
                            <span className={styles.floatingCopyText}>
                                <p>{variable}:&nbsp;</p>
                                <p style={{color: `${foreground}`, backgroundColor: `${hex}`}}>{hex}</p>
                            </span>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    )
}