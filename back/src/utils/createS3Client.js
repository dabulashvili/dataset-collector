const AWS = require('aws-sdk')

module.exports = (awsConfig) => {
    const EP = new AWS.Endpoint(awsConfig.host)
    AWS.config.update({
        accessKeyId: awsConfig.key.trim(),
        secretAccessKey: awsConfig.secret.trim(),
        s3ForcePathStyle: true,
    })
    return new AWS.S3({endpoint: EP})
}