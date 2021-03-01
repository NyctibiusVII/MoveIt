import puppeteer, { Page } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

export async function getOptions() {
    const isDev = !process.env.AWS_REGION
    let options

    const chromeExecPaths = {
        win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        //win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        linux: '/usr/bin/google-chrome',
        darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }

    const exePath = chromeExecPaths[process.platform]

    if (isDev) {
        options = {
            args: [],
            executablePath: exePath,
            headless: true
        }
    } else {
        options = {
            args: chrome.args,
            executablePath: await chrome.executablePath,
            headless: chrome.headless
        }
    }

    return options
}

let _page: Page | null
async function getPage(): Promise<Page> {
    if (_page) {
        return _page
    }

    const options = await getOptions()
    const browser = await puppeteer.launch(options)

    _page = await browser.newPage()

    return _page
}

export async function getScreenshot(html: string, { width, height } = { width: 1200, height: 630 }) {
    const page = await getPage()
    await page.setContent(html)
    await page.setViewport({ width, height })

    const file = await page.screenshot({ type: 'png' })

    return file
}