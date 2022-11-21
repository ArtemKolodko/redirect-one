const MatchHost = '.1'
const RedirectProtocol = 'https://'
const RedirectHost = 'one.country'

function parseUrl (urlStr) {
    if(urlStr.includes(`${MatchHost}&`)) {
        const url = new URL(urlStr)
        if(url) {
            const queryParam = url.searchParams.get('q')
            if(queryParam) {
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
