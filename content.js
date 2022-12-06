const TargetHost = '.1'
const RedirectHost = '1.country'

const replaceOneLinks = () => {
    try {
        const links = document.querySelectorAll('a');
        for (let i = 0; i < links.length; i++) {
            const link = links[i].getAttribute("href") || '';
            if(link.endsWith(TargetHost)) {
                const [prefix = '', postfix = ''] = link.split(TargetHost)
                const domain = prefix.replace(/(http(s?)):\/\//, '')
                const href = `https://${domain ? domain + '.' : ''}${RedirectHost}${postfix}`
                links[i].setAttribute('href', href)
            }
        }
    } catch (e) {
        console.error('Cannot check .1 links:', e)
    }
}


replaceOneLinks()
