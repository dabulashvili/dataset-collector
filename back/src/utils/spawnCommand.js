const spawn = require('child_process').spawn
const readStreamAsString = require('./readStreamAsString')

module.exports = async (command, args = [], workDir = '/') =>
    new Promise(async (resolve, reject) => {
        if (args === null) args = []
        if (workDir === null) workDir = '/'
        const ls = spawn(command, args, { cwd: workDir })
        let result = await readStreamAsString(ls.stdout)
        let error = await readStreamAsString(ls.stderr)
        ls.on('exit', (code) => {
            if (code) return reject(error)
            resolve(result)
        })
    })
