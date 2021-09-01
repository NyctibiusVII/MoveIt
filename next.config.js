module.exports = {
  generateEtags: false,
  pageExtensions: ['tsx', 'ts'],
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    DEVELOPER_NAME: process.env.DEVELOPER_NAME,
    MY_GITHUB:   `${process.env.GITHUB}${process.env.DEVELOPER_NAME}`,

    SITE_URL_BASE:                process.env.SITE_URL_BASE,
    SITE_URL_BASE_API:            process.env.SITE_URL_BASE_API,
    SITE_URL_BASE_TWITTER_INTENT: process.env.SITE_URL_BASE_TWITTER_INTENT,

    ERROR_GET: `Algo deu errado. Por favor recarregue a página, se o erro persistir consulte meu contato no github: ${process.env.GITHUB}${process.env.DEVELOPER_NAME}`
  },
  images: {
    domains: ['github.com', 'moveit-db.herokuapp.com'],
  },
  env: {
    TIME_COUNTDOWN_PRODUCTION: 25,
    TIME_COUNTDOWN_TEST: (0.2/3)/2,

    TOAST_BAR_COUNTDOWN: 4,

    STANDARD_LEVEL: 1,
    STANDARD_CURRENT_EXPERIENCE: 0,
    STANDARD_CHALLENGES_COMPLETED: 0,

    DEFAULT_THEME: 'light',
    DEFAULT_COOKIE_CONSENT: 0
  },
}