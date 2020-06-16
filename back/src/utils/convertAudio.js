const spawnCommand = require('./spawnCommand')

module.exports = async (audioPath, outputPath) => {
    const args = [
        '-i',
        audioPath,
        '-acodec',
        'pcm_s16le',
        outputPath
    ]

    await spawnCommand('ffmpeg', args)
}