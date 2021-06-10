import { LoginProvider } from '../contexts/LoginContext'

import { LoginForm } from '../components/LoginForm'

import { GetServerSideProps } from 'next'

import Image   from 'next/image'
import Cookies from 'js-cookie'
import styles  from '../styles/pages/login.module.css'

interface LoginProps {
    __avatar_url: string
    __username:   string
    __isLogged:   number
}

export default function Login(props: LoginProps) {
    Cookies.set('sidebar&FAB', 'disabled') // NOTE: Sidebar depends on this cookie to be visible if this page is accessed directly via the URL

    const imgSize = 40
    const loginLoaderImg    = () => `./logo-large.svg`
    const logoFullLoaderImg = () => `./logo-full-white.svg`
    const githubLoaderImg   = () => `./icons/github.svg`

    return (
        <LoginProvider
            __avatar_url={props.__avatar_url}
            __username={props.__username}
            __isLogged={props.__isLogged}
        >
            <div className={styles.container}>
                <div className={styles.division}>
                    <div className={styles.containerLogoLarge}>
                    <Image
                        loader={loginLoaderImg}
                        src='
                            <svg width="768" height="660" viewBox="0 0 768 660" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.08">
                                    <path d="M355.527 0H522.433L383.582 660H216.677L355.527 0Z" fill="url(#paint0_linear)"/>
                                    <path d="M601.502 0H768L660.08 518.4H493.542L601.502 0Z" fill="url(#paint1_linear)"/>
                                    <path d="M107.959 0H274.458L166.538 518.4H0L107.959 0Z" fill="url(#paint2_linear)"/>
                                </g>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="369.555" y1="0" x2="369.555" y2="660" gradientUnits="userSpaceOnUse">
                                        <stop stop-opacity="0"/>
                                        <stop offset="1"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear" x1="630.771" y1="0" x2="630.771" y2="518.4" gradientUnits="userSpaceOnUse">
                                        <stop stop-opacity="0"/>
                                        <stop offset="1"/>
                                    </linearGradient>
                                    <linearGradient id="paint2_linear" x1="137.229" y1="0" x2="137.229" y2="518.4" gradientUnits="userSpaceOnUse">
                                        <stop stop-opacity="0"/>
                                        <stop offset="1"/>
                                    </linearGradient>
                                </defs>
                            </svg>'
                        alt="Logo Gigante"
                        width={768}
                        height={660}
                    />
                </div>

                    <main>
                    <div className={styles.containerLogoFill}>
                        <Image
                            loader={logoFullLoaderImg}
                            src='
                                <svg width="250" height="50" viewBox="0 0 250 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)"><path d="M107.307 22.0488L103.685 38.6822H94.2484L97.8707 22.0488C98.1546 20.7414 97.99 20.5004 96.6529 20.5004H93.2463C91.9177 20.5004 91.6395 20.7414 91.3585 22.0155C91.3585 22.0155 91.3585 22.0377 91.3585 22.0488L87.7362 38.6822H78.2914L81.9166 22.0488C82.2005 20.7414 82.0358 20.5004 80.6959 20.5004H77.2893C75.9494 20.5004 75.6797 20.7441 75.3959 22.0488L71.7707 38.6822H62.3345L67.8957 13.149H75.5605L76.7755 15.3428C77.4745 14.6247 78.3205 14.0583 79.2586 13.6803C80.1967 13.3023 81.2058 13.1213 82.2204 13.149H84.1763C87.8668 13.149 90.3564 14.714 91.2478 17.3593C92.8971 14.4176 95.2874 13.149 98.1745 13.149H100.133C105.677 13.149 108.496 16.6419 107.307 22.0488Z" fill="#fff"/>
                                        <path d="M136.084 22.0487L134.4 29.7824C133.222 35.1893 128.879 38.6821 123.329 38.6821H116.181C110.639 38.6821 107.82 35.1865 108.999 29.7796L110.682 22.0487C111.857 16.6418 116.201 13.1489 121.753 13.1489H128.913C134.443 13.1489 137.265 16.6418 136.084 22.0487ZM126.639 22.0487C126.923 20.7413 126.758 20.5003 125.421 20.5003H122.015C120.675 20.5003 120.405 20.7441 120.121 22.0487L118.435 29.7796C118.151 31.087 118.318 31.328 119.655 31.328H123.062C124.399 31.328 124.672 31.0842 124.956 29.7796L126.639 22.0487Z" fill="#fff"/>
                                        <path d="M194.975 20.0156C194.63 21.467 193.796 22.7639 192.607 23.6996L187.801 27.5775C186.649 28.523 185.199 29.0548 183.694 29.0843H177.039L176.889 29.7685C176.605 31.0759 176.77 31.3169 178.11 31.3169H192.508L190.907 38.671H174.624C169.082 38.671 166.263 35.1754 167.441 29.7685L169.125 22.0376C170.303 16.6307 174.646 13.1378 180.196 13.1378H187.361C192.889 13.1489 195.747 16.459 194.975 20.0156ZM185.09 22.0487C185.374 20.7413 185.21 20.5003 183.87 20.5003H180.463C179.129 20.4975 178.845 20.744 178.561 22.0487L177.993 24.7106H183.614C183.866 24.7004 184.108 24.6102 184.303 24.4537C184.497 24.2972 184.634 24.083 184.693 23.8436L185.09 22.0487Z" fill="#fff"/>
                                        <path d="M205.583 34.3471C205.061 36.7431 203.122 38.6849 200.19 38.6849C197.257 38.6849 196.167 36.7459 196.689 34.3471C197.212 31.9484 199.151 30.0122 202.083 30.0122C205.016 30.0122 206.097 31.9484 205.583 34.3471Z" fill="#4CD62B"/>
                                        <path d="M225.829 13.1489L224.228 20.4975L220.254 38.6794H210.82L214.795 20.4975H210.085L211.689 13.1461L225.829 13.1489ZM218.823 8.38186C217.188 6.60911 217.687 3.56772 219.933 1.59276C222.178 -0.382197 225.327 -0.542853 226.97 1.23267C228.614 3.0082 228.106 6.04958 225.86 8.02454C223.615 9.9995 220.461 10.1602 218.823 8.38186Z" fill="#fff"/>
                                        <path d="M240.972 16.8246L238.15 29.7796C237.866 31.087 238.031 31.328 239.368 31.328H245.236L243.635 38.6821H235.888C230.346 38.6821 227.525 35.1865 228.703 29.7796L231.524 16.8246H227.956L229.557 9.47044H233.134L234.446 3.44861H243.89L242.579 9.47044H250.005L248.395 16.8246H240.972Z" fill="#fff"/><path d="M25.5088 3.745H37.4829L27.5215 50H15.5474L25.5088 3.745Z" fill="#fff"/>
                                        <path d="M43.0786 3.745H55.0527L47.2914 39.9868H35.3145L43.0786 3.745Z" fill="#fff"/>
                                        <path d="M7.76366 3.745H19.7378L11.9765 39.9868H-0.000488281L7.76366 3.745Z" fill="#fff"/>
                                        <path d="M171.027 13.1489L153.531 38.6821H143.879L137.498 13.1489H147.834L150.613 29.9153L160.691 13.1628L171.027 13.1489Z" fill="#fff"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="250" height="50" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>'
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
                                    loader={githubLoaderImg}
                                    src='
                                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <g clip-path="url(#clip0)">
                                              <path d="M20 0.833374C31.05 0.833374 40 9.63338 40 20.4867C40 29.1717 34.27 36.5367 26.325 39.1334C25.325 39.3184 24.9583 38.71 24.9583 38.1884C24.9583 37.7217 24.975 36.485 24.9833 34.8467C30.5467 36.0317 31.72 32.21 31.72 32.21C32.63 29.9417 33.945 29.335 33.945 29.335C35.7567 28.1167 33.805 28.1417 33.805 28.1417C31.7967 28.2784 30.7417 30.1667 30.7417 30.1667C28.9583 33.1717 26.06 32.3034 24.9167 31.8017C24.7367 30.53 24.2217 29.665 23.65 29.1734C28.0917 28.6817 32.76 26.9917 32.76 19.4617C32.76 17.3167 31.985 15.5634 30.7017 14.1884C30.9267 13.6917 31.6017 11.6934 30.5267 8.98671C30.5267 8.98671 28.8517 8.46004 25.0267 11.0017C23.4267 10.565 21.7267 10.3484 20.0267 10.3384C18.3267 10.3484 16.6267 10.565 15.0267 11.0017C11.2267 8.46004 9.55168 8.98671 9.55168 8.98671C8.47668 11.6934 9.15168 13.6917 9.35168 14.1884C8.07668 15.5634 7.30168 17.3167 7.30168 19.4617C7.30168 27.0117 11.9767 28.6734 16.4267 29.1567C15.7267 29.7467 15.0767 30.9517 15.0767 32.7934C15.0767 35.4234 15.1017 37.5367 15.1017 38.175C15.1017 38.69 14.7517 39.305 13.7267 39.1084C5.72501 36.5284 1.52588e-05 29.1584 1.52588e-05 20.4867C1.52588e-05 9.63338 8.95501 0.833374 20 0.833374Z" fill="#B3B9FF"/>
                                          </g>
                                          <defs>
                                              <clipPath id="clip0">
                                                  <rect width="40" height="40" fill="white" transform="matrix(-1 0 0 1 40 0)"/>
                                              </clipPath>
                                          </defs>
                                      </svg>'
                                    alt="Logo Github"
                                    width={imgSize}
                                    height={imgSize}
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