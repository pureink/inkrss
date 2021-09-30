function removeCdata(str) {
    if (str.substring(0, 12) === 'type="html">') str = str.substring(12)
    if (str.substring(0, 9) === '<![CDATA[')
        return str.substring(9, str.length - 3).replace(/(^\s*)|(\s*$)/g, "")
    return str.replace(/(^\s*)|(\s*$)/g, "")
}

function identifyTitle(xml) {
    const re = /<title[^>]*>(?<title>.*)<\/title>/im;
    const match = xml.match(re);
    const title = match && match.groups && match.groups.title || '';
    return title ? `title|${title}` : null;
}

function identifyGuid(xml) {
    const re = /<(guid|id)[^>]*>(?<guid>.*)<\/(guid|id)>/im;
    const match = xml.match(re);
    const guid = match && match.groups && match.groups.guid || '';
    return guid ? `guid|${guid}` : null;
}

function identifyLink(xml) {
    const re = /<(link|url)[^>]*>(?<link>.*)<\/(link|url)>/im;
    const match = xml.match(re);
    const link = match && match.groups && match.groups.link || '';
    return link ? `link|${link}` : null;
}

function identifyItem(fullxml) {
    const re = /<(item|entry)[^>]*>(?<item>[\s\S]*?)<\/(item|entry)>/im;
    const match = fullxml.match(re);
    return match && match.groups && match.groups.item || '';
}

function identifyLastBuildDate(fullxml) {
    const re = /<lastBuildDate[^>]*>(?<lastBuildDate>[\s\S]*?)<\/lastBuildDate>/im;
    const match = fullxml.match(re);
    const lastBuildDate = match && match.groups && match.groups.lastBuildDate || '';
    return lastBuildDate ? `lastBuildDate|${lastBuildDate}` : null;
}

export function identify(fullxml) {
    const lastBuildDate = identifyLastBuildDate(fullxml);
    if (lastBuildDate) { return lastBuildDate; }

    const firstItem = identifyItem(fullxml);
    return firstItem
        ? identifyGuid(firstItem) || identifyLink(firstItem) || identifyTitle(firstItem)
        : null
}
