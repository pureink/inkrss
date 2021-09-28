function removeCdata(str) {
    if (str.substring(0, 12) === 'type="html">') str = str.substring(12)
    if (str.substring(0, 9) === '<![CDATA[')
        return str.substring(9, str.length - 3).replace(/(^\s*)|(\s*$)/g, "")
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

function identifyTitle(fullxml) {
    const re = /<item[^>]*>[\s\S]*?<title[^>]*>(?<title>.*)<\/title>[\s\S]*?<\/item>/im
    const match = fullxml.match(re)
    return match && removeCdata(match.groups.title) || null
}

function identifyGuid(fullxml) {
    const re = /<item[^>]*>[\s\S]*?<guid[^>]*>(?<guid>.*)<\/guid>[\s\S]*?<\/item>/im
    const match = fullxml.match(re)
    return match && match.groups.guid || null
}

function identifyLink(fullxml) {
    const re = /<item[^>]*>[\s\S]*?<link[^>]*>(?<link>.*)<\/link>[\s\S]*?<\/item>/im
    const match = fullxml.match(re)
    return match && match.groups.link || null
}

export function identify(fullxml) {
    return identifyGuid(fullxml) || identifyLink(fullxml) || identifyTitle(fullxml)
}
