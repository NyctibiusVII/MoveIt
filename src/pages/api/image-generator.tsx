import { NextApiRequest, NextApiResponse } from 'next'
import { getScreenshot } from '../../infra/getScreenshot'

const getHTML = ({ level, currentExperience, challengesCompleted }) =>
`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="language" content="pt-br">

            <title>Next Level🥳</title>

            <meta name="robots" content="noindex, nofollow">
            <meta name="googlebot" content="noindex, nofollow">
            <meta name="googlebot-news" content="nosnippet">
            <meta name="rating" content="general">
            <meta name="distribution" content="global">
            <meta name="author" content="Matheus Vidigal - (NyctibiusVII)">
            <meta name="creator" content="Matheus Vidigal - (NyctibiusVII)">
            <meta name="copyright" content="© 2021 Matheus Vidigal - (NyctibiusVII)">
            <meta name="description" content="Minha evolução no MoveIt. #NextLevelWeek">
            <meta name="keywords" content="Evolução, Next level week, moveit, move.it, move-it, MoveIt, pomodoro, vercel, nyctibius, rocketseat, tecnica pomodoro">

            <meta property="og:type" content="page">
            <meta property="og:url" content="https://moveit-nyctibiusvii.vercel.app/">
            <meta property="og:locale" content="pt-br">
            <meta property="og:title" content="MoveIt">
            <meta property="og:site_name" content="MoveIt">
            <meta property="og:image" content="">
            <meta property="og:description" content="Minha evolução no MoveIt. #NextLevelWeek">

            <meta property="article:author" content="Matheus Vidigal - (NyctibiusVII)">

            <meta name="twitter:card" content="summary_large_image">
            <meta name="twitter:site" content="@moveit">
            <meta name="twitter:title" content="MoveIt">
            <meta name="twitter:description" content="Minha evolução no MoveIt. #NextLevelWeek">
            <meta name="twitter:creator" content="@NyctibiusVII">

            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="content-type" content="text/html; charset=UTF-8">
            <meta http-equiv="content-language" content="pt-br">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">

            <style>
                /* Geral */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                :root {
                    --white: #fff;

                    --blue-very-light: #F5FCFF;
                    --blue-light: #5F6BED;
                    --blue: #5965e0;
                    --blue-dark: #4953b8;
                    --blue-twitter: #2aa9e0;

                    --gray-line: #dcdde0;
                    --background: #000;

                    --title: #2e384d;

                    --text-highlight: #b3b9ff;
                    --text: #666;
                }
                html {
                    font-size: 93.75%;
                }
                body {
                    background-color: var(--background);
                    color: var(--text);
                }
                body,
                button {
                    font: 600 2.5rem "inter", sans-serif;
                }
                h6 {
                    color: var(--text);

                    margin-bottom: 0.5rem;

                    opacity: 0.5;
                }
                span {
                    color: var(--blue);
                    letter-spacing: 2px;
                }



                /* Page */
                .container {
                    width: 1200px;
                    height: 630px;

                    background-color: var(--white);

                    padding: 7rem 10rem 7rem 0;

                    display: grid;
                    grid-template-columns: 2fr 1fr;
                }
                .between {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .separation {
                    width: 100%;
                    height: 1px;

                    background-color: var(--gray-line);

                    margin: 2rem 0;
                }



                /*------- A -------*/
                /* level */
                .containerDetailLevel {
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }
                .level {
                    z-index: 1000;
                }
                .level span {
                    font-size: 19.297rem;
                    font-weight: 700;
                    line-height: 0.85;
                    letter-spacing: 0 !important;

                    filter: drop-shadow(5px 10px 6px rgba(220, 221, 224));
                }.detailA {
                    margin-right: -90px;
                }
                .detailB {
                    margin-left: -90px;
                }
                .detailA,
                .detailB {
                    margin-top: 16px;
                }

                /* text */
                .textNextLevel {
                    text-align: center;
                }
                .textNextLevel strong {
                    color: var(--title);
                    font-size: 3.7rem;
                }



                /*------- B -------*/
                /* info */
                .challenges p,
                .experience p {
                    font-size: 2.5rem;
                    font-weight: 500;
                    line-height: 1.5;
                }

                /* img */
            </style>
        </head>
        <body>
            <div class="container">
                <div class="between">
                    <div class="containerDetailLevel">

                        <!--<img src="/icons/detail-A.svg" class="detailA" alt="Detalhe a" />-->
                        <div class="detailA">
                            <svg width="162" height="228" viewBox="0 0 162 228" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M44.9445 56.6257C44.9445 56.6257 57.8535 48.05 57.4465 29.8687C57.05 11.6846 45.4878 0.871704 45.4878 0.871704C45.4878 0.871704 30.6387 11.2856 31.0403 29.0325C31.4336 46.7482 44.9445 56.6257 44.9445 56.6257ZM60.7464 95.5984C60.7464 95.5984 76.4512 89.9943 81.7881 73.101C87.1146 56.2105 75.763 41.9557 75.763 41.9557C75.763 41.9557 61.6751 48.9925 56.1901 66.3277C50.7286 83.6678 60.7464 95.5984 60.7464 95.5984ZM32.9903 93.9734C32.9903 93.9734 38.9929 79.6056 28.6158 64.6764C18.2464 49.7339 2.67661 47.179 2.67661 47.179C2.67661 47.179 -3.89843 64.1359 6.22456 78.6974C16.3165 93.2673 32.9903 93.9734 32.9903 93.9734ZM75.7939 142.673C75.7939 142.673 64.3175 132.139 67.4825 114.229C70.6504 96.3306 83.7032 87.5041 83.7032 87.5041C83.7032 87.5041 96.7908 100.154 93.7372 117.609C90.647 135.051 75.7939 142.673 75.7939 142.673ZM107.208 117.341C107.208 117.341 95.0518 127.358 93.5731 145.508C92.1019 163.645 104.505 173.037 104.505 173.037C104.505 173.037 118.547 164.046 119.988 146.375C121.428 128.705 107.208 117.341 107.208 117.341ZM149.288 171.262C152.973 188.621 142.097 201.3 142.097 201.3C142.097 201.3 127.527 195.885 123.742 178.072C119.967 160.257 128.714 147.132 128.714 147.132C128.714 147.132 145.592 153.906 149.288 171.262ZM29.9399 103.539C44.2067 114.744 42.7113 130.262 42.7113 130.262C42.7113 130.262 26.5942 134.535 12.6552 123.599C-1.28097 112.674 0.0330788 94.4897 0.0330788 94.4897C0.0330788 94.4897 15.6393 92.331 29.9399 103.539ZM64.456 164.325C64.456 164.325 62.4867 148.852 46.0878 141.089C29.6841 133.35 14.9659 138.947 14.9659 138.947C14.9659 138.947 17.7137 156.993 33.6972 164.532C49.6806 172.071 64.456 164.325 64.456 164.325ZM66.1724 173.721C84.1217 176.119 90.6523 190.291 90.6523 190.291C90.6523 190.291 78.9339 202.19 61.4308 199.84C43.9408 197.498 35.8886 181.13 35.8886 181.13C35.8886 181.13 48.1996 171.318 66.1724 173.721ZM101.908 200.973C83.8111 200.759 72.7208 211.976 72.7208 211.976C72.7208 211.976 82.6355 227.253 100.288 227.507C117.926 227.709 128.134 214.483 128.134 214.483C128.134 214.483 119.997 201.199 101.908 200.973ZM40.9222 64.6409L49.4177 66.3314C48.737 69.8433 34.3951 153.361 161.079 214.314L157.387 222.13C24.2963 158.122 40.7491 65.5699 40.9222 64.6409Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="70.6897" y1="0.871704" x2="70.6897" y2="227.509" gradientUnits="userSpaceOnUse"><stop stop-color="#DCDDE0"/><stop offset="1" stop-color="#DCDDE0" stop-opacity="0"/></linearGradient></defs></svg>
                        </div>

                        <div class="level">
                            <span>${level}</span>
                        </div>

                        <!--<img src="/icons/detail-B.svg" class="detailB" alt="Detalhe b" />-->
                        <div class="detailB">
                            <svg width="162" height="227" viewBox="0 0 162 227" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M117.056 55.8947C117.056 55.8947 104.147 47.319 104.554 29.1377C104.95 10.9536 116.512 0.140747 116.512 0.140747C116.512 0.140747 131.362 10.5546 130.96 28.3016C130.567 46.0173 117.056 55.8947 117.056 55.8947ZM101.256 94.8674C101.256 94.8674 85.551 89.2634 80.2141 72.3701C74.8877 55.4795 86.2392 41.2247 86.2392 41.2247C86.2392 41.2247 100.327 48.2615 105.812 65.5968C111.274 82.9369 101.256 94.8674 101.256 94.8674ZM129.012 93.2423C129.012 93.2423 123.009 78.8746 133.386 63.9453C143.756 49.0029 159.326 46.4479 159.326 46.4479C159.326 46.4479 165.901 63.4048 155.778 77.9664C145.686 92.5362 129.012 93.2423 129.012 93.2423ZM86.2084 141.942C86.2084 141.942 97.6848 131.408 94.5197 113.498C91.3518 95.5995 78.299 86.773 78.299 86.773C78.299 86.773 65.2114 99.423 68.265 116.878C71.3553 134.32 86.2084 141.942 86.2084 141.942ZM54.7962 116.61C54.7962 116.61 66.9525 126.627 68.4312 144.777C69.9023 162.914 57.499 172.306 57.499 172.306C57.499 172.306 43.4572 163.315 42.0166 145.644C40.576 127.974 54.7962 116.61 54.7962 116.61ZM12.7146 170.531C9.02896 187.89 19.9052 200.569 19.9052 200.569C19.9052 200.569 34.4752 195.154 38.2602 177.341C42.0348 159.526 33.2887 146.401 33.2887 146.401C33.2887 146.401 16.4105 153.175 12.7146 170.531ZM132.06 102.808C117.794 114.013 119.289 129.531 119.289 129.531C119.289 129.531 135.406 133.804 149.345 122.868C163.281 111.943 161.967 93.7586 161.967 93.7586C161.967 93.7586 146.361 91.5999 132.06 102.808ZM97.5463 163.593C97.5463 163.593 99.5155 148.121 115.914 140.358C132.318 132.619 147.036 138.216 147.036 138.216C147.036 138.216 144.289 156.261 128.305 163.801C112.322 171.34 97.5463 163.593 97.5463 163.593ZM95.8328 172.99C77.8836 175.388 71.353 189.56 71.353 189.56C71.353 189.56 83.0714 201.459 100.575 199.109C118.065 196.767 126.117 180.399 126.117 180.399C126.117 180.399 113.806 170.587 95.8328 172.99ZM60.0942 200.241C78.1911 200.028 89.2815 211.245 89.2815 211.245C89.2815 211.245 79.3667 226.522 61.7143 226.776C44.0759 226.978 33.8684 213.751 33.8684 213.751C33.8684 213.751 42.0049 200.468 60.0942 200.241ZM121.081 63.9098L112.586 65.6003C113.266 69.1122 127.608 152.63 0.923828 213.583L4.61658 221.399C137.707 157.391 121.254 64.8388 121.081 63.9098Z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="71.6122" y1="0.140747" x2="71.6122" y2="226.778" gradientUnits="userSpaceOnUse"><stop stop-color="#DCDDE0"/><stop offset="1" stop-color="#DCDDE0" stop-opacity="0"/></linearGradient></defs></svg>
                        </div>
                    </div>

                    <!-- level | text -->

                    <div class="textNextLevel">
                        <strong>Avancei para </strong><br><strong>o próximo level</strong>
                    </div>
                </div>

                <!-- A | B -->

                <div class="between">
                    <div>
                        <div class="challenges">
                            <h6>DESAFIOS</h6>
                            <p><span>${challengesCompleted}</span>&nbsp;completados</p>
                        </div>
                        <div class="separation"></div>
                        <div class="experience">
                            <h6>EXPERIÊNCIA</h6>
                            <p><span>${currentExperience}</span>&nbsp;xp</p>
                        </div>
                        <div class="separation"></div>
                    </div>

                    <!-- info | img -->

                    <div>
                        <svg width="250" height="50" viewBox="0 0 250 50" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M107.307 22.0488L103.685 38.6822H94.2484L97.8707 22.0488C98.1546 20.7414 97.99 20.5004 96.6529 20.5004H93.2463C91.9177 20.5004 91.6395 20.7414 91.3585 22.0155C91.3585 22.0155 91.3585 22.0377 91.3585 22.0488L87.7362 38.6822H78.2914L81.9166 22.0488C82.2005 20.7414 82.0358 20.5004 80.6959 20.5004H77.2893C75.9494 20.5004 75.6797 20.7441 75.3959 22.0488L71.7707 38.6822H62.3345L67.8957 13.149H75.5605L76.7755 15.3428C77.4745 14.6247 78.3205 14.0583 79.2586 13.6803C80.1967 13.3023 81.2058 13.1213 82.2204 13.149H84.1763C87.8668 13.149 90.3564 14.714 91.2478 17.3593C92.8971 14.4176 95.2874 13.149 98.1745 13.149H100.133C105.677 13.149 108.496 16.6419 107.307 22.0488Z" fill="#5965E0"/><path d="M136.084 22.0487L134.4 29.7824C133.222 35.1893 128.879 38.6821 123.329 38.6821H116.181C110.639 38.6821 107.82 35.1865 108.999 29.7796L110.682 22.0487C111.857 16.6418 116.201 13.1489 121.753 13.1489H128.913C134.443 13.1489 137.265 16.6418 136.084 22.0487ZM126.639 22.0487C126.923 20.7413 126.758 20.5003 125.421 20.5003H122.015C120.675 20.5003 120.405 20.7441 120.121 22.0487L118.435 29.7796C118.151 31.087 118.318 31.328 119.655 31.328H123.062C124.399 31.328 124.672 31.0842 124.956 29.7796L126.639 22.0487Z" fill="#5965E0"/><path d="M194.975 20.0156C194.63 21.467 193.796 22.7639 192.607 23.6996L187.801 27.5775C186.649 28.523 185.199 29.0548 183.694 29.0843H177.039L176.889 29.7685C176.605 31.0759 176.77 31.3169 178.11 31.3169H192.508L190.907 38.671H174.624C169.082 38.671 166.263 35.1754 167.441 29.7685L169.125 22.0376C170.303 16.6307 174.646 13.1378 180.196 13.1378H187.361C192.889 13.1489 195.747 16.459 194.975 20.0156ZM185.09 22.0487C185.374 20.7413 185.21 20.5003 183.87 20.5003H180.463C179.129 20.4975 178.845 20.744 178.561 22.0487L177.993 24.7106H183.614C183.866 24.7004 184.108 24.6102 184.303 24.4537C184.497 24.2972 184.634 24.083 184.693 23.8436L185.09 22.0487Z" fill="#5965E0"/><path d="M205.583 34.3471C205.061 36.7431 203.122 38.6849 200.19 38.6849C197.257 38.6849 196.167 36.7459 196.689 34.3471C197.212 31.9484 199.151 30.0122 202.083 30.0122C205.016 30.0122 206.097 31.9484 205.583 34.3471Z" fill="#4CD62B"/><path d="M225.829 13.1489L224.228 20.4975L220.254 38.6794H210.82L214.795 20.4975H210.085L211.689 13.1461L225.829 13.1489ZM218.823 8.38186C217.188 6.60911 217.687 3.56772 219.933 1.59276C222.178 -0.382197 225.327 -0.542853 226.97 1.23267C228.614 3.0082 228.106 6.04958 225.86 8.02454C223.615 9.9995 220.461 10.1602 218.823 8.38186Z" fill="#5965E0"/><path d="M240.972 16.8246L238.15 29.7796C237.866 31.087 238.031 31.328 239.368 31.328H245.236L243.635 38.6821H235.888C230.346 38.6821 227.525 35.1865 228.703 29.7796L231.524 16.8246H227.956L229.557 9.47044H233.134L234.446 3.44861H243.89L242.579 9.47044H250.005L248.395 16.8246H240.972Z" fill="#5965E0"/><path d="M25.5088 3.745H37.4829L27.5215 50H15.5474L25.5088 3.745Z" fill="#5965E0"/><path d="M43.0786 3.745H55.0527L47.2914 39.9868H35.3145L43.0786 3.745Z" fill="#5965E0"/><path d="M7.76366 3.745H19.7378L11.9765 39.9868H-0.000488281L7.76366 3.745Z" fill="#5965E0"/><path d="M171.027 13.1489L153.531 38.6821H143.879L137.498 13.1489H147.834L150.613 29.9153L160.691 13.1628L171.027 13.1489Z" fill="#5965E0"/></g><defs><clipPath id="clip0"><rect width="250" height="50" fill="white"/></clipPath></defs></svg>
                    </div>
                </div>
            </div>
        </body>
    </html>
`

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const isHTMLDebugMode = false
    const withoutUrlInfo = 'null'
    //or
    // - Adicione na URL: /?level=SEU_NIVEL
    // - Adicione na URL: /?currentExperience=SUA_EXPERIENCIA
    // - Adicione na URL: /?challengesCompleted=SUA_QUANTIDADE_DE_DESAFIOS_CONCLUÍDOS

    const html = getHTML({
        level: req.query.level || withoutUrlInfo,
        currentExperience: req.query.currentExperience || withoutUrlInfo,
        challengesCompleted: req.query.challengesCompleted || withoutUrlInfo,
    })

    if (isHTMLDebugMode) {
      res.setHeader('Content-Type', 'text/html')
      return res.end(html)
    }

    const file = await getScreenshot(html, { width: 1200, height: 630 })

    function returnImg() {
        // - Para usar em produção (file)
        res.setHeader('Content-Type', 'image/png')
        res.end(file)
    }
    function returnHtml() {
        // - Para usar o dev tools (html)
        res.setHeader('Content-Type', 'html')
        res.end(html)
    }

    returnImg() //prod
    //returnHtml() //dev
}