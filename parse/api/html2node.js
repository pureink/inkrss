import jsdom from 'jsdom'
const { JSDOM } = jsdom
function domToNode(domNode) {
    if (domNode.nodeType == domNode.TEXT_NODE) {
        return domNode.data
    }
    if (domNode.nodeType != domNode.ELEMENT_NODE) {
        return false
    }
    var nodeElement = {}
    nodeElement.tag = domNode.tagName.toLowerCase()
    for (var i = 0; i < domNode.attributes.length; i++) {
        var attr = domNode.attributes[i]
        if (attr.name == 'href' || attr.name == 'src') {
            if (!nodeElement.attrs) {
                nodeElement.attrs = {}
            }
            nodeElement.attrs[attr.name] = attr.value
        }
    }
    if (domNode.childNodes.length > 0) {
        nodeElement.children = []
        for (var i = 0; i < domNode.childNodes.length; i++) {
            var child = domNode.childNodes[i]
            nodeElement.children.push(domToNode(child))
        }
    }
    return nodeElement
}
module.exports = (req, res) => {
    const { body } = req
    const dom = new JSDOM('<body>' + body.content + '</body>')
    const node = domToNode(dom.window.document.body)
    const data = node.children
    res.send(data)
}
