import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContexts";

interface CountdownContextData {
    minutes: number
    seconds: number
    isActive: boolean
    hasFinished: boolean
    startCountdown: () => void
    resetCountdown: () => void
}
interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const __fixedMinutes = 25
    const { startNewChallenge } = useContext(ChallengesContext)

    const [time, setTime] = useState(__fixedMinutes * 60) //25min * 60sec = 1500sec
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown() {
        setIsActive(true)
    }
    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setIsActive(false)
        setHasFinished(false)
        setTime(__fixedMinutes * 60)
    }
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time === 0) {
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            isActive,
            hasFinished,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}