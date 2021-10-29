import { UserAPI } from './user'

export interface Props {
    __avatar_url: string
    __username:   string
    __isLogged:   number

    level:               number
    currentExperience:   number
    challengesCompleted: number
}

export interface AppProps {
    props: {
        __avatar_url: string
        __username:   string
        __isLogged:   number

        level:               number
        currentExperience:   number
        challengesCompleted: number
    }
}

export interface AppPropsLeaderbord {
    props: {
        __avatar_url: string
        __username:   string
        __isLogged:   number

        level:               number
        currentExperience:   number
        challengesCompleted: number

        users: UserAPI | null
    }
}