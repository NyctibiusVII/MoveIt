/* Import ---------------------------------------------------------------------- */ // - x70

import { LoginContext } from '../contexts/LoginContext'

import {
    useContext,
    useState
} from 'react'
import { ImgSize } from '../interface/imgSize'

import rightArrowImage from '../../public/icons/right-arrow.svg'

import Cookies from 'js-cookie'

import Image from 'next/image'

import styles from '../styles/components/LoginForm.module.css'

/* ---------------------------------------------------------------------- */

const preventDefault = (f: any) => (e: any) => {
    e.preventDefault()
    f(e)
}

export function LoginForm() {
    const { verifyUser } = useContext(LoginContext)
    const [ UsernameLocal, setUsernameLocal ] = useState('')

    const handleParam = (setValue: any) => (e: any) => setValue(e.target.value)

    const handleSubmit = preventDefault(() => {
        Cookies.set('usernameCacheForValidation', String(UsernameLocal))
        Cookies.set('usernameCacheForToast',      String(UsernameLocal))

        verifyUser()
    })

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                id="name"
                name="name"
                type="text"
                value={UsernameLocal}
                onChange={handleParam(setUsernameLocal)}
                className={styles.inputUsername}
                autoComplete="name"
                placeholder="Digite seu username"
                aria-label="username"
                required />
            <button type="submit" className={styles.btnSubmit}>
              <Image
                src={rightArrowImage}
                alt="Seta para direita"
                width={ImgSize.Little_x20 + 4}
                height={ImgSize.Little_x20 + 4}
              />
            </button>
        </form>
    )
}