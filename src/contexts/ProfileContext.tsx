import { LoginContext } from '../contexts/LoginContext'

import { createContext, useState, ReactNode, useEffect, useContext } from 'react'

interface ProfileContextData {
    //id:         String
    //avatar_url: String
    //type:       String
    //name:       String
    //username:   String
}
interface  ProfileProviderProps {
    children: ReactNode
}

export const ProfileContext = createContext({} as ProfileContextData)

export function ProfileProvider({ children }: ProfileProviderProps) {
    //const { __id, __avatar_url, __type, __name, __username } = useContext(LoginContext)

    // - Rename variables
    //const
    //    id         = __id,
    //    avatar_url = __avatar_url,
    //    type       = __type,
    //    name       = __name,
    //    username   = __username

    return (
        <ProfileContext.Provider
            value={{
                //id,
                //avatar_url,
                //type,
                //name,
                //username
            }}
        >
            { children }
        </ProfileContext.Provider>
    )
}