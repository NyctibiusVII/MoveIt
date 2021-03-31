import { LoginContext } from '../contexts/LoginContext'

import { useContext, useState } from 'react'

import Cookies from 'js-cookie'
import Image   from 'next/image'
import styles  from '../styles/components/LoginForm.module.css'

const preventDefault = f => e => {
    e.preventDefault()
    f(e)
}

export function LoginForm() {
    const { verifyUser } = useContext(LoginContext)
    const [ UsernameLocal, setUsernameLocal ] = useState('')

    const handleParam = setValue => e => setValue(e.target.value)

    const handleSubmit = preventDefault(() => {
        Cookies.set('usernameCacheForValidation', String(UsernameLocal))
        verifyUser()
    })

    const imgSize = 24
    const rightArrowLoaderImg = () => `./icons/right-arrow.svg`

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
                loader={rightArrowLoaderImg}
                src='
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.17939e-07 13.5L18.255 13.5L9.87 21.885L12 24L24 12L12 -1.04907e-06L9.885 2.115L18.255 10.5L1.18021e-06 10.5L9.17939e-07 13.5Z" fill="white"/>
                    </svg>'
                alt="Seta para direita"
                width={imgSize}
                height={imgSize}
              />
            </button>
        </form>
    )
}