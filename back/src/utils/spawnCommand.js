const spawn = require('child_process').spawn
const readStreamAsString = require('./readStreamAsString')

module.exports = async (command, arguments = [], workDir = "/") => {
    return new Promise(async (resolve, reject) => {
        if (arguments === null) arguments = []
        if (workDir === null) workDir = '/'
        const ls = spawn(command, arguments, {cwd: workDir});
        let result = await readStreamAsString(ls.stdout)
        let error = await readStreamAsString(ls.stderr)
        ls.on('exit', code => {
            if (code) return reject(error)
            resolve(result)
        })
    })
}
