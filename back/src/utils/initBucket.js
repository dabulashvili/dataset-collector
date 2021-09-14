module.exports = (s3Client, bucket) => {
    const bucketParams = {
        Bucket : bucket
    }

    return new Promise((resolve, reject) => {
        s3Client.headBucket(bucketParams, function(err, bucketData) {
            if (err) {
                s3Client.createBucket(bucketParams, function(err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })        
            } else {
                resolve(bucketData)
            }
        });
    })
}