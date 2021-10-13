const executeCommand = require('./executeCommand')

module.exports = async (audioPath) => {
    const args = [
        'ffprobe',
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        audioPath
    ]

    return executeCommand(args.join(' '))
}
