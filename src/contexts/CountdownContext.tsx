import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ChallengesContext } from "./ChallengesContexts"

interface CountdownContextData {
    percentToEndCycle: number
    minutes: number
    seconds: number
    isActive: boolean
    hasFinished: boolean
    isCounting: boolean
    startCountdown: () => void
    resetCountdown: () => void
}
interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const __fixedTimeCountdown = 25 // - For test: (0.2/3)/2 | For production: 25
    const fixedTime = __fixedTimeCountdown * 60 // - 25min * 60sec = 1500sec

    const [__INITIAL_percentToEndCycle, set_INITIAL_percentToEndCycle] = useState(0)
    const [__NEW_percentToEndCycle, set_NEW_percentToEndCycle] = useState(0)
    const [__FINAL_percentToEndCycle, set__FINAL_percentToEndCycle] = useState(0)
    const [percentToEndCycle, set_PercentToEndCycle] = useState(0)

    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(__fixedTimeCountdown * 60) // - 25min * 60sec = 1500sec
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const [isCounting, setIsCounting] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown() {
        setIsActive(true)

        setIsCounting(true)
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)

        setTime(__fixedTimeCountdown * 60)
        resetProgressCountdown()
        setIsCounting(false)
    }
    function resetProgressCountdown() {
        set_INITIAL_percentToEndCycle(0)
        set_NEW_percentToEndCycle(0)
        set__FINAL_percentToEndCycle(0)
        set_PercentToEndCycle(0)
    }
    async function INF({INITIAL, NEW, FINAL}) {
        set_INITIAL_percentToEndCycle(INITIAL + 1)
        const NEW_INITIAL = await(INITIAL + 1)

        set_NEW_percentToEndCycle(NEW_INITIAL * 100)
        const NEW_NEW = (NEW_INITIAL * 100)

        set__FINAL_percentToEndCycle(NEW_NEW / fixedTime)
        FINAL = Math.round(NEW_NEW / fixedTime)

        set_PercentToEndCycle(FINAL)

        return FINAL
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)

            INF({INITIAL:__INITIAL_percentToEndCycle, NEW:__NEW_percentToEndCycle, FINAL:__FINAL_percentToEndCycle})
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
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