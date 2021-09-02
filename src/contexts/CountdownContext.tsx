/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from './ChallengesContexts'

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react'

/* ---------------------------------------------------------------------- */

interface CountdownContextData {
    percentToEndCycle: number
    minutes:           number
    seconds:           number
    isActive:          boolean
    hasFinished:       boolean
    isCounting:        boolean
    startCountdown:    () => void
    resetCountdown:    () => void
}
interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const __TIME = (): number => {
        if (process.env.NODE_ENV === 'production') return Number(process.env.TIME_COUNTDOWN_PRODUCTION)
        else if (process.env.NODE_ENV === 'development') return Number(process.env.TIME_COUNTDOWN_TEST)
        else return Number(process.env.TIME_COUNTDOWN_TEST)
    }

    const __fixedTimeCountdown = __TIME()
    const fixedTime = __fixedTimeCountdown * 60 // - 25min * 60sec = 1500sec

    const [__INITIAL_percentToEndCycle, set_INITIAL_percentToEndCycle] = useState(0)
    const [__NEW_percentToEndCycle,     set_NEW_percentToEndCycle]     = useState(0)
    const [__FINAL_percentToEndCycle,   set_FINAL_percentToEndCycle]   = useState(0)
    const [percentToEndCycle,           set_PercentToEndCycle]         = useState(0)

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time,        setTime]        = useState(fixedTime)
    const [isActive,    setIsActive]    = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const [isCounting, setIsCounting] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown() {
        Notification.requestPermission()

        setIsActive(true)

        setIsCounting(true)
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive   (false)
        setHasFinished(false)

        setTime(__fixedTimeCountdown * 60)
        resetProgressCountdown()
        setIsCounting(false)
    }
    function resetProgressCountdown() {
        set_INITIAL_percentToEndCycle(0)
        set_NEW_percentToEndCycle    (0)
        set_FINAL_percentToEndCycle  (0)
        set_PercentToEndCycle        (0)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => setTime(time - 1), 1000)

            const INF = async (INITIAL: number, NEW: number, FINAL: number): Promise<number> => {
                set_INITIAL_percentToEndCycle(INITIAL + 1)
                const NEW_INITIAL = await(INITIAL + 1)

                set_NEW_percentToEndCycle(NEW_INITIAL * 100)
                const NEW_NEW = (NEW_INITIAL * 100)

                set_FINAL_percentToEndCycle(NEW_NEW / fixedTime)
                FINAL = Math.round(NEW_NEW / fixedTime)

                setTimeout(() => { set_PercentToEndCycle(FINAL) }, 0)

                return FINAL
            }

            INF(__INITIAL_percentToEndCycle, __NEW_percentToEndCycle, __FINAL_percentToEndCycle)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            percentToEndCycle,
            minutes,
            seconds,
            isActive,
            hasFinished,
            isCounting,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}