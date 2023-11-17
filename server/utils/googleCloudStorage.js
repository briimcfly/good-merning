const {Storage} = require('@google-cloud/storage');

const key = '';
const bucketName = 'dwellex';

const storage = new Storage({ key });
const bucket = storage.bucket(bucketName)

const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject)=>{
        if (!file) {
            reject('No image file');
        }

        const newFileName = `${Date.now()}-${file.originalname}`;
        const fileUpload = bucket.file(newFileName);
        
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            }
        })

        blobStream.on('error', (error) => {
            reject('Error occurred during upload' + error.message);
        })

        blobStream.end(file.buffer);
    })
}

module.exports = uploadImageToStorage;