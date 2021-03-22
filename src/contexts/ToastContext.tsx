import { createContext, useState, ReactNode, useEffect } from "react"

import Cookies from 'js-cookie'

interface ToastContextData {
    activeToast:    Boolean
    selectedToast:  Number
    percentToClose: Number
    fade__:         String
    sideSlide__:    String
    toastON:        () => void
    toastOFF:       () => void
}
interface ToastProviderProps {
    children: ReactNode
}

export const ToastContext = createContext({} as ToastContextData)

let timeoutLeft: NodeJS.Timeout

export function ToastProvider({ children }: ToastProviderProps) {
    const [ activeToast,    setActiveToast ]    = useState(false)
    const [ selectedToast,  setSelectedToast ]  = useState(0)

    const [fade__,      setFade__]      = useState('fadeIn')
    const [sideSlide__, setsideSlide__] = useState('sideSlideOn')

    const fixedTime = Number(process.env.TOAST_BAR_COUNTDOWN) // - 4s

    const [__INITIAL_percentToClose, set_INITIAL_percentToClose] = useState(0)
    const [__NEW_percentToClose,     set_NEW_percentToClose]     = useState(0)
    const [__FINAL_percentToClose,   set_FINAL_percentToClose]   = useState(0)
    const [percentToClose,           set_PercentToClose]         = useState(0)

    const [time,     setTime]     = useState(fixedTime)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        Cookies.set('whichToast',  'undefined')
        Cookies.set('activeToast', 'disabled')
    }, [])

    function toastON() {
        const selected = Number(Cookies.get('whichToast'))
        setSelectedToast(selected)

        Cookies.set('activeToast', 'enable')
        setActiveToast(true)

        setIsActive(true)
    }
    function toastOFF() {
        Cookies.set('whichToast',  'undefined')

        Cookies.set('activeToast', 'disabled')
        setActiveToast(false)

        clearTimeout(timeoutLeft)
        setIsActive(false)

        setTime(fixedTime)
        resetProgresstimeoutLeft()
    }
    function setAnimation() {
        setFade__('fadeOut')
        setsideSlide__('sideSlideOff')

        setTimeout(() => {
            setFade__('fadeIn')
            setsideSlide__('sideSlideOn')
        }, 200)
    }
    function resetProgresstimeoutLeft() {
        set_INITIAL_percentToClose(0)
        set_NEW_percentToClose    (0)
        set_FINAL_percentToClose  (0)
        set_PercentToClose        (0)
    }

    async function INF({INITIAL, NEW, FINAL}) {
        set_INITIAL_percentToClose(INITIAL + 1)
        const NEW_INITIAL = await(INITIAL + 1)

        set_NEW_percentToClose(NEW_INITIAL * 100)
        const NEW_NEW = (NEW_INITIAL * 100)

        set_FINAL_percentToClose(NEW_NEW / fixedTime)
        FINAL = Math.round(NEW_NEW / fixedTime)

        setTimeout(() => {
            set_PercentToClose(FINAL)
        }, 0)

        return FINAL
    }

    useEffect(() => {
        time === 1 ? setTimeout(() => setAnimation(), 800) : ''

        if (isActive && time > 0) {
            timeoutLeft = setTimeout(() => {
                setTime(time - 1)
            }, 1000)

            INF({INITIAL:__INITIAL_percentToClose, NEW:__NEW_percentToClose, FINAL:__FINAL_percentToClose})
        } else if (isActive && time === 0) {
            toastOFF()
        }
    }, [isActive, time])

    /*
        console.log(`
            isActive       : ${isActive}
            time           : ${time}s
            percentToClose : ${percentToClose}%
            _________________________

            fade__      : ${fade__}
            sideSlide__ : ${sideSlide__}
        `) // - Look info
    */

    return(
        <ToastContext.Provider value={{
            activeToast,
            selectedToast,
            percentToClose,
            fade__,
            sideSlide__,
            toastON,
            toastOFF
        }}>
            {children}
        </ToastContext.Provider>
    )
}