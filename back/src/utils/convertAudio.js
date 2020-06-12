const spawnCommand = require('./spawnCommand')

module.exports = async (audioPath, outputPath) => {
    const args = [
        '-i',
        audioPath,
        '-acodec',
        'pcm_u8',
        outputPath
    ]

    await spawnCommand('ffmpeg', args)
}