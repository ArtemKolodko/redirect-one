const MatchHost = '.1'
const RedirectProtocol = 'https://'
const RedirectHost = '1.country'

function parseUrl (urlStr) {
    if(urlStr && urlStr.includes(`${MatchHost}&`)) {
        const url = new URL(urlStr)
        if(url) {
            const queryParam = url.searchParams.get('q')
            const sourceId = url.searchParams.get('sourceid')

            // sourceId === 'chrome' means that search was triggered from browser URL, not from https://google.com
            if(sourceId === 'chrome' && queryParam) {
                const [subDomains] = queryParam.split(MatchHost)
                return `${RedirectProtocol}${subDomains ? subDomains + '.' : ''}${RedirectHost}`
            }
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
