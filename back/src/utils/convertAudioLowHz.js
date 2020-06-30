const spawnCommand = require('./spawnCommand')

module.exports = async (audioPath, outputPath) => {
    const args = [
        '-i',
        audioPath,
        '-ar',
        '22050',
        '-ac',
        '1',
        outputPath
    ]

    await spawnCommand('ffmpeg', args)
}