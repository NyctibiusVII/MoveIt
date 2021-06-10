interface Cookies {
    __avatar_url: string
    __isLogged:   string
    __username:   string

    activePage:   string
    activeTheme:  string
    activeToast:  string

    level:               string
    challengesCompleted: string
    currentExperience:   string

    'sidebar&FAB': string
    whichToast:    string
    cookieConsent: string
    usernameCacheForToast: string
    usernameCacheForValidation: string
}
interface ISLOGGED {
    __true: string
    __false: string
}
interface COOKIES_CONSENT {
    __true: string
    __false: string
}

export const CookiesType: Cookies = {
    __avatar_url: '__avatar_url',
    __isLogged:   '__isLogged',
    __username:   '__username',

    activePage:   'activePage',
    activeTheme:  'activeTheme',
    activeToast:  'activeToast',

    level:               'level',
    challengesCompleted: 'challengesCompleted',
    currentExperience:   'currentExperience',

    'sidebar&FAB': 'sidebar&FAB',
    whichToast:    'whichToast',
    cookieConsent: 'cookieConsent',
    usernameCacheForToast:      'usernameCacheForToast',
    usernameCacheForValidation: 'usernameCacheForValidation'
}
export const ISLOGGED: ISLOGGED = {
    __true:  '1',
    __false: '0',
}
export const COOKIES_CONSENT: COOKIES_CONSENT = {
    __true:  '1',
    __false: '0',
}