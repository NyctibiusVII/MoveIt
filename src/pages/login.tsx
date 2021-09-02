/* Import ---------------------------------------------------------------------- */ // - x70

import { LoginProvider } from '../contexts/LoginContext'

import { LoginForm } from '../components/LoginForm'

import { ImgSize } from '../interface/imgSize'

import { GetServerSideProps } from 'next'

import loginImage    from '../../public/logo-large.svg'
import logoFullImage from '../../public/logo-full-white.svg'
import githubImage   from '../../public/icons/github.svg'

import Cookies from 'js-cookie'

import Image from 'next/image'
import Head  from 'next/head'

import styles from '../styles/pages/login.module.css'

/* ---------------------------------------------------------------------- */

interface LoginProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export default function Login(props: LoginProps) {
    Cookies.set('sidebar&FAB', 'disabled') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    return (
        <LoginProvider
            __avatar_url={props.__avatar_url}
            __username={props.__username}
            __isLogged={props.__isLogged}
        >
            <div className={styles.container}>
                <Head>
                    <title>Login | MoveIt</title>
                </Head>

                <div className={styles.division}>
                    <div className={styles.containerLogoLarge}>
                    <Image
                        src={loginImage}
                        alt="Logo Gigante"
                        width={768}
                        height={660}
                    />
                </div>

                    <main>
                    <div className={styles.containerLogoFill}>
                        <Image
                            src={logoFullImage}
                            alt="Logo Github"
                            width={360}
                            height={76}
                        />
                    </div>

                    <div className={styles.containerLogin}>
                        <h3>Bem-vindo</h3>
                        <div className={styles.containerLoginWithGithub}>
                            <div className={styles.logoGithub}>
                                <Image
                                    src={githubImage}
                                    alt="Logo Github"
                                    width={ImgSize.Small_x40}
                                    height={ImgSize.Small_x40}
                                />
                            </div>
                            <p>Faça login com seu Github para começar</p>
                        </div>
                        <LoginForm />
                    </div>
                </main>
                </div>
            </div>
        </LoginProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { __username, __avatar_url, __isLogged } = ctx.req.cookies

  return {
      props: {
          __avatar_url: String(__avatar_url),
          __username:   String(__username),
          __isLogged:   Number(__isLogged)
      }
  }
}