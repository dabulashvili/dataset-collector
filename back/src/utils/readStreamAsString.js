module.exports = stream => {
    return new Promise((resolve, reject) => {
        let buffer = new Buffer.from([])
        stream.on('data', chunk => {
            buffer = Buffer.concat([buffer, chunk])
        })

        stream.on('end', () => {
            resolve(buffer.toString())
        })

        stream.on('close', () => {
            resolve(buffer.toString())
        })

        stream.on('finish', () => {
            resolve(buffer.toString())
        })

        stream.on('error', err => reject(err))
    })
}