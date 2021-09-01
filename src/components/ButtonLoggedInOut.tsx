/* Import ---------------------------------------------------------------------- */ // - x70

import { ChallengesContext } from '../contexts/ChallengesContexts'
import { LoginContext }      from '../contexts/LoginContext'

import {
    useContext,
    useEffect,
    useState
} from 'react'
import { ImgSize } from '../interface/imgSize'

import Cookies from 'js-cookie'

import Image   from 'next/image'
import Router  from 'next/router'

import styles from '../styles/components/ButtonLoggedInOut.module.css'

/* ---------------------------------------------------------------------- */

export function ButtonLoggedInOut() {
    const { resetCookiesDataLCC } = useContext(ChallengesContext)
    const { login, logout }       = useContext(LoginContext)

    /* ------- */ const [ isLogged, setIsLogged ] = useState(false)
    /* ------- */
    /* ------- */ useEffect(() => {
    /* ------- */     let mounted = true
    /* ------- */
    /* ------- */     Promise
    /* ------- */         .resolve(Cookies.get('__isLogged'))
    /* ------- */         .then(resp => mounted && setIsLogged(Number(resp) === 1 ? true : false))
    /* ------- */         .catch(err => console.error(err))
    /* ------- */
    /* ------- */     return () => { mounted = false } // - Cleanup()
    /* ------- */ }, [ logout, login, [] ])

    const __LOGIN  = () => Router.push('/login')
    const __LOGOUT = () => { logout(), resetCookiesDataLCC() }

    return (
        <>
            { isLogged ? (
                <button id='btnLoggedOut' className={styles.btnLL} onClick={__LOGOUT}>
                    <div>
                        <Image
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMi4wMDUzMyA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTMyMCAyNzcuMzM1OTM4Yy0xMS43OTY4NzUgMC0yMS4zMzIwMzEgOS41NTg1OTMtMjEuMzMyMDMxIDIxLjMzMjAzMXY4NS4zMzU5MzdjMCAxMS43NTM5MDYtOS41NTg1OTQgMjEuMzMyMDMyLTIxLjMzNTkzOCAyMS4zMzIwMzJoLTY0di0zMjBjMC0xOC4yMTg3NS0xMS42MDU0NjktMzQuNDk2MDk0LTI5LjA1NDY4Ny00MC41NTQ2ODhsLTYuMzE2NDA2LTIuMTEzMjgxaDk5LjM3MTA5M2MxMS43NzczNDQgMCAyMS4zMzU5MzggOS41NzgxMjUgMjEuMzM1OTM4IDIxLjMzNTkzN3Y2NGMwIDExLjc3MzQzOCA5LjUzNTE1NiAyMS4zMzIwMzIgMjEuMzMyMDMxIDIxLjMzMjAzMnMyMS4zMzIwMzEtOS41NTg1OTQgMjEuMzMyMDMxLTIxLjMzMjAzMnYtNjRjMC0zNS4yODUxNTYtMjguNzE0ODQzLTYzLjk5OTk5OTc1LTY0LTYzLjk5OTk5OTc1aC0yMjkuMzMyMDMxYy0uODEyNSAwLTEuNDkyMTg4LjM2MzI4MTc1LTIuMjgxMjUuNDY4NzQ5NzUtMS4wMjczNDQtLjA4NTkzNy0yLjAwNzgxMi0uNDY4NzQ5NzUtMy4wNTA3ODEtLjQ2ODc0OTc1LTIzLjUzMTI1IDAtNDIuNjY3OTY5IDE5LjEzMjgxMjc1LTQyLjY2Nzk2OSA0Mi42NjQwNjI3NXYzODRjMCAxOC4yMTg3NSAxMS42MDU0NjkgMzQuNDk2MDkzIDI5LjA1NDY4OCA0MC41NTQ2ODdsMTI4LjM4NjcxOCA0Mi43OTY4NzVjNC4zNTE1NjMgMS4zNDM3NSA4LjY3OTY4OCAxLjk4NDM3NSAxMy4yMjY1NjMgMS45ODQzNzUgMjMuNTMxMjUgMCA0Mi42NjQwNjItMTkuMTM2NzE4IDQyLjY2NDA2Mi00Mi42Njc5Njh2LTIxLjMzMjAzMmg2NGMzNS4yODUxNTcgMCA2NC0yOC43MTQ4NDQgNjQtNjR2LTg1LjMzNTkzN2MwLTExLjc3MzQzOC05LjUzNTE1Ni0yMS4zMzIwMzEtMjEuMzMyMDMxLTIxLjMzMjAzMXptMCAwIiBmaWxsPSIjZmZmZmZmIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+PHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJtNTA1Ljc1IDE5OC4yNTM5MDYtODUuMzM1OTM4LTg1LjMzMjAzMWMtNi4wOTc2NTYtNi4xMDE1NjMtMTUuMjczNDM3LTcuOTM3NS0yMy4yNS00LjYzMjgxMy03Ljk1NzAzMSAzLjMwODU5NC0xMy4xNjQwNjIgMTEuMDkzNzUtMTMuMTY0MDYyIDE5LjcxNDg0NHY2NGgtODUuMzMyMDMxYy0xMS43NzczNDQgMC0yMS4zMzU5MzggOS41NTQ2ODgtMjEuMzM1OTM4IDIxLjMzMjAzMiAwIDExLjc3NzM0MyA5LjU1ODU5NCAyMS4zMzIwMzEgMjEuMzM1OTM4IDIxLjMzMjAzMWg4NS4zMzIwMzF2NjRjMCA4LjYyMTA5MyA1LjIwNzAzMSAxNi40MDYyNSAxMy4xNjQwNjIgMTkuNzE0ODQzIDcuOTc2NTYzIDMuMzA0Njg4IDE3LjE1MjM0NCAxLjQ2ODc1IDIzLjI1LTQuNjI4OTA2bDg1LjMzNTkzOC04NS4zMzU5MzdjOC4zMzk4NDQtOC4zMzk4NDQgOC4zMzk4NDQtMjEuODI0MjE5IDAtMzAuMTY0MDYzem0wIDAiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                            alt="Logged out"
                            width={ImgSize.Mini_x16}
                            height={ImgSize.Mini_x16}
                        />
                        <div className={styles.spaceSeparation} />
                    </div>

                    <span>Logout</span>
                </button>
            ) : (
                <button id='btnLoggedIn' className={styles.btnLL} onClick={__LOGIN}>
                    <span>Fazer login</span>

                    <div>
                        <div className={styles.spaceSeparation} />
                        <Image
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTQ2NS41MzUxNTYuMzIwMzEyYy0uNTMxMjUtLjA0Mjk2OC0uOTgwNDY4LS4zMjAzMTItMS41MzUxNTYtLjMyMDMxMmgtMjI5LjMzMjAzMWMtMzUuMjg1MTU3IDAtNjQgMjguNzE0ODQ0LTY0IDY0djIxLjMzMjAzMWMwIDExLjc3NzM0NCA5LjU1NDY4NyAyMS4zMzU5MzggMjEuMzMyMDMxIDIxLjMzNTkzOHMyMS4zMzIwMzEtOS41NTg1OTQgMjEuMzMyMDMxLTIxLjMzNTkzOHYtMjEuMzMyMDMxYzAtMTEuNzUzOTA2IDkuNTc4MTI1LTIxLjMzMjAzMSAyMS4zMzU5MzgtMjEuMzMyMDMxaDk5LjM5MDYyNWwtNi41MDc4MTMgMi4xNzU3ODFjLTE3LjI3NzM0MyA1Ljk3MjY1Ni0yOC44ODI4MTIgMjIuMjUtMjguODgyODEyIDQwLjQ4ODI4MXYzMjBoLTY0Yy0xMS43NTc4MTMgMC0yMS4zMzU5MzgtOS41NzgxMjUtMjEuMzM1OTM4LTIxLjMzMjAzMXYtNDIuNjY3OTY5YzAtMTEuNzczNDM3LTkuNTU0Njg3LTIxLjMzMjAzMS0yMS4zMzIwMzEtMjEuMzMyMDMxcy0yMS4zMzIwMzEgOS41NTg1OTQtMjEuMzMyMDMxIDIxLjMzMjAzMXY0Mi42Njc5NjljMCAzNS4yODUxNTYgMjguNzE0ODQzIDY0IDY0IDY0aDY0djIxLjMzMjAzMWMwIDIzLjUzMTI1IDE5LjEzMjgxMiA0Mi42Njc5NjkgNDIuNjY0MDYyIDQyLjY2Nzk2OSA0LjU2NjQwNyAwIDguODk4NDM4LS42NjAxNTYgMTMuNTg5ODQ0LTIuMTEzMjgxbDEyOC4xNzE4NzUtNDIuNzMwNDY5YzE3LjMwMDc4MS01Ljk3MjY1NiAyOC45MDYyNS0yMi4yNSAyOC45MDYyNS00MC40ODgyODF2LTM4NGMwLTI0Ljg3NS0yMS40NDE0MDYtNDQuMzc1LTQ2LjQ2NDg0NC00Mi4zNDc2NTd6bTAgMCIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiI+PC9wYXRoPjxwYXRoIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZD0ibTIyOC40MTQwNjIgMTk4LjI1LTg1LjMzMjAzMS04NS4zMzIwMzFjLTYuMTAxNTYyLTYuMTAxNTYzLTE1LjI3MzQzNy03LjkzNzUtMjMuMjUzOTA2LTQuNjI4OTA3LTcuOTU3MDMxIDMuMzA0Njg4LTEzLjE2MDE1NiAxMS4wOTM3NS0xMy4xNjAxNTYgMTkuNzEwOTM4djY0aC04NS4zMzU5MzhjLTExLjc3MzQzNyAwLTIxLjMzMjAzMSA5LjU1ODU5NC0yMS4zMzIwMzEgMjEuMzMyMDMxIDAgMTEuNzc3MzQ0IDkuNTU4NTk0IDIxLjMzNTkzOCAyMS4zMzIwMzEgMjEuMzM1OTM4aDg1LjMzNTkzOHY2NGMwIDguNjE3MTg3IDUuMjAzMTI1IDE2LjQwMjM0MyAxMy4xNjAxNTYgMTkuNzEwOTM3IDcuOTgwNDY5IDMuMzA0Njg4IDE3LjE1MjM0NCAxLjQ3MjY1NiAyMy4yNTM5MDYtNC42Mjg5MDZsODUuMzMyMDMxLTg1LjMzNTkzOGM4LjM0Mzc1LTguMzM5ODQzIDguMzQzNzUtMjEuODIwMzEyIDAtMzAuMTY0MDYyem0wIDAiIGZpbGw9IiNmZmZmZmYiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiPjwvcGF0aD48L2c+PC9zdmc+"
                            alt="Logged in"
                            width={ImgSize.Mini_x16}
                            height={ImgSize.Mini_x16}
                        />
                    </div>
                </button>
            ) }

            <style jsx>{`
                #btnLoggedOut:hover {
                    background-color: var(--btn-logged-out);

                    animation: pulse-red 2s infinite;
                    -webkit-animation: pulse-red 2s infinite;
                }

                #btnLoggedIn:hover {
                    background-color: var(--btn-logged-in);

                    animation: pulse-blue 2s infinite;
                    -webkit-animation: pulse-blue 2s infinite;
                }
            `}</style>
        </>
    )
}