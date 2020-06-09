const spawnCommand = require('./spawnCommand')

module.exports = async (audioPath, outputPath) => {
    const args = [
        '-i',
        audioPath,
        '-acodec',
         'libmp3lame',
        outputPath
    ]

    await spawnCommand('ffmpeg', args)
}