import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        const
            ptBR  = "pt-BR",
            title = "MoveIt",
            site  = "MoveIt",
            link  = "https://moveit-nyctibiusvii.vercel.app/",
            NyctibiusVII = "Matheus Vidigal - (NyctibiusVII)",
            NyctibiusVII_twitter = "@NyctibiusVII",
            description = "Projeto web construído durante o NLW#04 com a Rocketseat/Diego Fernandes. MOVEIT: 'Gerenciando o seu tempo para uma melhor produtividade'. ⏳⏰🏃🏻‍♂️🤸🏻‍♀️",
            keywords    = "nodejs, css, html, typescript, reactjs, nextjs, cookies, discovery, pomodoro, moveit, projeto, contexts, rocketseat, vercel, nextlevelweek, diegofernandes, nlw4, trilha-react, tecnicapomodoro, gerenciamento-do-seu-tempo"

        return (
            <Html lang="pt-BR">
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="language" content="pt-BR" />

                    <meta name="robots"       content="all" />
                    <meta name="rating"       content="general" />
                    <meta name="distribution" content="global" />
                    <meta name="description"  content="Gerenciando o seu tempo para uma melhor produtividade. ⏳⏰🏃🏻‍♂️🤸🏻‍♀️" />

                    <meta name="author"   content={ NyctibiusVII } />
                    <meta name="creator"  content={ NyctibiusVII } />
                    <meta name="keywords" content={ keywords } />

                    <meta httpEquiv="content-type"     content="text/html; charset=UTF-8" />
                    <meta httpEquiv="content-language" content={ ptBR } />
                    <meta httpEquiv="X-UA-Compatible"  content="ie=edge" />

                    <meta property="og:title"       content={ title } />
                    <meta property="og:site_name"   content={ site } />
                    <meta property="og:description" content={ description } />
                    <meta property="og:image"  content="" />
                    <meta property="og:type"   content="page" />
                    <meta property="og:url"    content={ link } />
                    <meta property="og:locale" content={ ptBR } />

                    <meta property="article:author" content={ NyctibiusVII } />

                    <meta name="twitter:title" content={ title } />
                    <meta name="twitter:site"  content={ site } />
                    <meta name="twitter:creator"     content={ NyctibiusVII_twitter } />
                    <meta name="twitter:description" content={ description } />
                    <meta name="twitter:card"        content="summary_large_image" />

                    <link rel="shortcut icon" href="/icons/logo-bar.svg" type="image/png" />

                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Rajdhani:wght@600&amp;display=swap" rel="stylesheet" />

                    <meta name="google-site-verification" content="OjYiqlxK64Fx5dZre97pwHGJ7pYgOP4vQYH1UCOdBuo" />
                </Head>
                <body>
                    <Main />
                    <noscript data-n-css="">
                        <br/><br/>
                        Caro leitor!<br/><br/>
                        Se você estiver lendo esta mensagem é porque o seu navegador não suporta<br/>
                        &quot;Javascript&quot; ou porque a permissão de executar &quot;Javascript&quot; está<br/>
                        desabilitada, se for o caso, por favor habilite.
                    </noscript>
                    <NextScript />
                </body>
            </Html>
        )
    }
}