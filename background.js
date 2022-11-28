const TargetHost = '.1'
const RedirectHost = '1.country'

function parseUrl (urlStr) {
    const url = new URL(urlStr)
    if(url) {
        const queryParam = url.searchParams.get('q') || ''
        const isRedirectedFromUrl = url.searchParams.get('sourceid') === 'chrome'

        // Do not handle requests coming from main google search page
        if(isRedirectedFromUrl && queryParam.includes(TargetHost)) {
            const [prefix = '', postfix = ''] = queryParam.split(TargetHost)
            const domain = prefix.replace(/(http(s?)):\/\//, '')
            return `https://${domain ? domain + '.' : ''}${RedirectHost}${postfix}`
        }
    }
}

chrome.webRequest.onBeforeRequest.addListener((data) => {
    const redirectUrl = parseUrl(data.url)
    if(redirectUrl) {
        return {
            redirectUrl
        }
    }
}, {urls: ["<all_urls>"]}, ["blocking"])
