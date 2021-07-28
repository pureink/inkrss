function removeCdata(str) {
    if (str.substring(0, 12) === 'type="html">') str = str.substring(12)
    if (str.substring(0, 9) === '<![CDATA[')
        return str.substring(9, str.length - 3).replace(/(^\s*)|(\s*$)/g,"")
    return str.replace(/(^\s*)|(\s*$)/g,"")
}
export function identify(fullxml) {
    const start = '<title'
    const end = '</title>'
    const title = fullxml.substring(
        fullxml.indexOf(start) + 7,
        fullxml.indexOf(end)
    )
    const xml = fullxml.substring(fullxml.indexOf(end) + 8)
    if (xml.indexOf(start) === -1) {
        return 'null'
    }
    const title2 = xml.substring(xml.indexOf(start) + 7, xml.indexOf(end))
    if (title.indexOf(title2) === -1) {
        return removeCdata(title2)
    }
    const xmlxml = xml.substring(xml.indexOf(end) + 8)
    return removeCdata(
        xmlxml.substring(xmlxml.indexOf(start) + 7, xmlxml.indexOf(end))
    )
}
