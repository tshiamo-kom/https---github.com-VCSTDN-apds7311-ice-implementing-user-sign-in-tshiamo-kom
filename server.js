const app = require('./index')
const port = 6000
const fs = require('fs')
const https = require('https')
const options = {
    keys: fs.readFileSync('Keys/privatekey.pem'),
    cert: fs.readFileSync('Keys/certificate.pem')
}
const server = https.createServer(options, app)

server.listen(port, () => {
    console.log('server started on port' + port)
})