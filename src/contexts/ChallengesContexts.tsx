/* Import ---------------------------------------------------------------------- */ // - x70

import { LevelUpModal } from '../components/LevelUpModal'

import {
    createContext,
    ReactNode,
    useEffect,
    useState
} from 'react'

import { api } from '../services/api'

import { User }                  from '../interface/user'
import { CookiesType, ISLOGGED } from '../interface/cookiesType'

import Cookies from 'js-cookie'

import challenges from '../../challenges.json'

/* ---------------------------------------------------------------------- */

interface Challenge {
    type:        'body' | 'eye'
    description: string
    amount:      number
}
interface ChallengesContextData {
    level:                 number
    currentExperience:     number
    experienceToNextLevel: number
    challengesCompleted:   number
    activeChallenge:       Challenge
    levelUp:               () => void
    startNewChallenge:     () => void
    resetChallenge:        () => void
    completeChallenge:     () => void
    closeLevelUpModal:     () => void
    resetCookiesDataLCC:   () => void
}
interface ChallengesProviderProps {
    children:            ReactNode
    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level,               setLevel]               = useState(rest.level               ?? Number(process.env.STANDARD_LEVEL)) // - abc ?? 1 | Se 'abc' não existir use 1
    const [currentExperience,   setCurrentExperience]   = useState(rest.currentExperience   ?? Number(process.env.STANDARD_CURRENT_EXPERIENCE))
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? Number(process.env.STANDARD_CHALLENGES_COMPLETED))

    const [activeChallenge,    setActiveChallenge]    = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        const __ISLOGGED: boolean = Cookies.get('__isLogged') === ISLOGGED.__true

        const setDb_newValue = async () => {
            const username = Cookies.get(CookiesType.__username)

            await api
            .get(`/users/${username}`, {
                validateStatus: (status: number): boolean => status < 500 // - Resolve only if the status code is less than 500
            })
            .then(async resp => {
                if (Number(resp.request.status) === 200) {
                    const
                        data: User= resp.data,
                        updateUser: User = {
                            github_id:  data.github_id,
                            avatar_url: data.avatar_url,
                            username:   data.username,
                            name:       data.name,
                            email:      data.email,
                            type:       data.type,
                            level:                level,               // - Alterado
                            current_experience:   currentExperience,   // - Alterado
                            challenges_completed: challengesCompleted, // - Alterado
                            theme:          data.theme,
                            cookie_consent: data.cookie_consent
                        }

                        await api
                            .put(`/users/${username}`, updateUser)
                            .catch(e => { throw e })
                }
                else { console.error(process.env.ERROR_GET) }
            })
            .catch(e => { throw e })
        }
        const setCookies_newValue = () => {
            Cookies.set('level',               String(level))
            Cookies.set('currentExperience',   String(currentExperience))
            Cookies.set('challengesCompleted', String(challengesCompleted))
        }
        const setCookies_default = () => {
            resetCookiesDataLCC()

            Cookies.set('level',               process.env.STANDARD_LEVEL!)
            Cookies.set('currentExperience',   process.env.STANDARD_CURRENT_EXPERIENCE!)
            Cookies.set('challengesCompleted', process.env.STANDARD_CHALLENGES_COMPLETED!)
        }

        if(__ISLOGGED) {
            setDb_newValue()
            setCookies_newValue()
        } else {
            /**
             * Evitando bugs*
             *
             * - Se (level, currentExperience ou challengesCompleted)
             * for deletado dos cookies automaticamente todas as três variáveis
             * serão setadas para seu 'Default' novamente, impedindo assim,
             * uma possível desregulagem na contagem de level, experiência e
             * desafios completos.
             */
            if ((Cookies.get('level') && Cookies.get('currentExperience') && Cookies.get('challengesCompleted')) !== undefined) setCookies_newValue()
            else setCookies_default()
        }
    }, [ level, currentExperience, challengesCompleted ])

    function levelUp() {
      setLevel(level + 1)
      setIsLevelUpModalOpen(true)

      new Audio('/nextLevel.ogg').play()
    }
    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }
    function startNewChallenge() {
        const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengesIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }
    function resetChallenge() {
        setActiveChallenge(null)
    }
    function completeChallenge() {
        if (!activeChallenge) return

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience > experienceToNextLevel) {
            finalExperience =+ experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    function resetCookiesDataLCC() {
        setLevel              (Number(process.env.STANDARD_LEVEL))
        setCurrentExperience  (Number(process.env.STANDARD_CURRENT_EXPERIENCE))
        setChallengesCompleted(Number(process.env.STANDARD_CHALLENGES_COMPLETED))
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
                resetCookiesDataLCC
            }}
        >
            { children }
            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}