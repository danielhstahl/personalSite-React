const { pdf_urls } = require('../package.json')
const { exec } = require('child_process')

Promise.all(
    pdf_urls.map(({ url, name }) => new Promise((res, rej) => {
        exec(`curl -L -o ./src/assets/pdf/${name}.pdf ${url}`, err => {
            if (err) {
                rej(err)
            }
            else {
                res()
            }
        })
    }))
)