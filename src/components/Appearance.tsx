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

    /* --------- */ const [ lightTheme,  setLightTheme ]  = useState('')
    /* --------- */ const [ darkTheme,   setDarkTheme ]   = useState('')
    /* --------- */ const [ customTheme, setCustomTheme ] = useState('')
    /* --------- */
    /* --------- */ useEffect(() => {
    /* --------- */     let mounted = true
    /* --------- */
    /* --------- */     Promise
    /* --------- */         .resolve(Cookies.get('activeTheme'))
    /* --------- */         .then(resp => {
    /* --------- */             if (mounted) {
    /* --------- */                 setLightTheme (resp === 'light'  ? 'activeTheme' : '') // - inactiveTheme
    /* --------- */                 setDarkTheme  (resp === 'dark'   ? 'activeTheme' : '') // - inactiveTheme
    /* --------- */                 setCustomTheme(resp === 'custom' ? 'activeTheme' : '') // - inactiveTheme
    /* --------- */             }
    /* --------- */         })
    /* --------- */         .catch(err => console.log(err))
    /* --------- */
    /* --------- */     return () => { mounted = false } // - Cleanup()
    /* --------- */ }, [ changeLight, changeDark, changeCustom, [] ])

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

    const successLoader = () => `/icons/toast-success.svg`

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
                            loader={successLoader}
                            src={`
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 408.576 408.576" style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                                    <path d="M204.288,0C91.648,0,0,91.648,0,204.288s91.648,204.288,204.288,204.288s204.288-91.648,204.288-204.288 S316.928,0,204.288,0z M318.464,150.528l-130.56,129.536c-7.68,7.68-19.968,8.192-28.16,0.512L90.624,217.6 c-8.192-7.68-8.704-20.48-1.536-28.672c7.68-8.192,20.48-8.704,28.672-1.024l54.784,50.176L289.28,121.344 c8.192-8.192,20.992-8.192,29.184,0C326.656,129.536,326.656,142.336,318.464,150.528z" fill="#ffffff"/>
                                </svg>
                                `}
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