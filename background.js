const TargetHost = '.1'
const RedirectHost = '1.country'

function parseUrl (urlStr) {
    const url = new URL(urlStr)
    if(url) {
        const { hostname } = url
        const queryParam = url.searchParams.get('q') || url.searchParams.get('p') || ''

        const isGoogle = hostname.includes('google') && url.searchParams.get('sourceid') === 'chrome'
        const isBrave = hostname.includes('brave') && url.searchParams.get('source') === 'desktop'
        const isBing = hostname.includes('bing') && url.searchParams.get('FORM') === 'CHROMN'

        const isRedirectedFromUrlSearch = isGoogle || isBrave || isBing

        // Do not handle requests coming from main google search page
        if(isRedirectedFromUrlSearch && queryParam.includes(TargetHost)) {
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
