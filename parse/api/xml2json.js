import Parser from 'rss-parser'
import axios from 'axios'
let parser = new Parser()

module.exports = async (req, res) => {
    const { body } = req
    const { data } = await axios.get(body.url)
    const feed = await parser.parseString(data)
    res.send(feed)
}
