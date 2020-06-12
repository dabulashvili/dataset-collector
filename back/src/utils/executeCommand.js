const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async (command, workDir = process.cwd()) => {

    const {stdout, stderr} = await exec(command);
    if (stderr) throw stderr
    return stdout
}
