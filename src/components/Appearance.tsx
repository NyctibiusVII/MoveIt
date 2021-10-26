/* Import ---------------------------------------------------------------------- */ // - x70

import { EmBreve } from '../components/EmBreve'

import {
    useEffect,
    useState
} from 'react'
import { useTheme }        from 'next-themes'
import { ImgSize }         from '../interface/imgSize'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import successImage from '../../public/icons/toast-success.svg'

import Cookies from 'js-cookie'

import Image   from 'next/image'

import styles from '../styles/components/Appearance.module.scss'

/* ---------------------------------------------------------------------- */

export function Appearance() {
    const [ mounted, setMounted ] = useState(false)
    const { theme,   setTheme   } = useTheme()

    const
        [ variable,   setVariable   ] = useState(''),
        [ hex,        setHex        ] = useState(''),
        [ foreground, setForeground ] = useState(''),
        [ copied,     setCopied     ] = useState(false)

    const
        [ fade__,      setFade__      ] = useState(''),
        [ sideSlide__, setSideSlide__ ] = useState('')

    const
        LIGHT_iconCopy = 'var(--white)',
        DARK_iconCopy  = 'var(--grey-800)'

    useEffect(() => { Cookies.set('activeTheme', (theme ?? 'light')) }, [ theme ])
    //console.info(`themeCurrent: ${theme}`) // - Look info

    const
        changeLight  = () => setTheme('light'),
        changeDark   = () => setTheme('dark'),
        changeCustom = () => console.info('Desculpe, mas este recurso ainda esta em desenvolvimento.')// - setTheme('custom')

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
            variable:'--grey-50',
            hex:'#f2f3f5',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--grey-200',
            hex:'#dcdde0',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--grey-500',
            hex:'#babecc',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--grey-700',
            hex:'#666',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--blue-1200',
            hex:'#2e384d',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--blue-100',
            hex:'#b3b9ff',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--blue-600',
            hex:'#5965e0',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--green-500',
            hex:'#4cd62b',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--red-400',
            hex:'#e83f5b',
            foreground:`${LIGHT_iconCopy}`
        },
    ]
    const cdD = [
        {
            variable:'--blue-1400',
            hex:'#22232d',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--code-background',
            hex:'#282A36',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--grey-1100',
            hex:'#50536a',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--white',
            hex:'#fff',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--blue-100',
            hex:'#b3b9ff',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--purple-200',
            hex:'#8257e6',
            foreground:`${LIGHT_iconCopy}`
        },
        {
            variable:'--green-200',
            hex:'#50fa7b',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--green-300',
            hex:'#48E06E',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--red-100',
            hex:'#ffafbf',
            foreground:`${DARK_iconCopy}`
        },
        {
            variable:'--red-300',
            hex:'#fa4362',
            foreground:`${LIGHT_iconCopy}`
        },
    ]

    // - When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return(
        <div className={styles.container}>
            <div className={styles.light}>
                <div className={styles.rbLight}>
                    <button type="button" className={`${styles.btnTheme} ${theme === 'light' ? 'activeTheme' : ''}`} onClick={changeLight}>
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
                    <button type="button" className={`${styles.btnTheme} ${theme === 'dark' ? 'activeTheme' : ''}`} onClick={changeDark}>
                        <p>DARK</p>
                    </button>
                </div>
                <div className={`${styles.cdDark} colorDisplays`}>
                    { cdD.map((values, index) => {
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
                                <div title={values.hex} className={styles.cdD}
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

            <div className={styles.custom}>
                <div className={styles.rbCustom}>
                    <button type="button" className={`${styles.btnTheme} ${theme === 'custom' ? 'activeTheme' : ''}`} onClick={changeCustom}>
                        <p>CUSTOM</p>
                    </button>
                </div>
                <div className={styles.cdCustom}>
                    <EmBreve/>
                </div>
            </div>

            { copied && (
                <div className={styles.containerOverlay}
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