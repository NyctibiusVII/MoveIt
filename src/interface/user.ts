export interface User {
    github_id:  string
    avatar_url: string
    username:   string
    name:       string
    email:      string
    type:       string
    level:                number
    current_experience:   number
    challenges_completed: number
    theme:          string
    cookie_consent: number
    // - created_at:     string
    // - updated_at:     string
}

export interface UserAPI {
    _id:        string // MongoDB ID
    github_id:  string
    avatar_url: string
    username:   string
    name:       string
    email:      string
    type:       string
    level:                number
    current_experience:   number
    challenges_completed: number
    theme:          string
    cookie_consent: number
    created_at:     string
    updated_at:     string
}

export interface UsersLeaderboard {
    avatar_url: string
    username:   string

    level:                number
    current_experience:   number
    challenges_completed: number

    position: number
}