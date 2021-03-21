module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    test: {
      console: ['hello word'],
    },
  },
  images: {
    domains: ['github.com'],
  },
  env: {
    TIME_COUNTDOWN_PRODUCTION: 25,
    TIME_COUNTDOWN_TEST: (0.2/3)/2,
    STANDARD_LEVEL: 1,
    STANDARD_CURRENT_EXPERIENCE: 0,
    STANDARD_CHALLENGES_COMPLETED: 0,
  },
}