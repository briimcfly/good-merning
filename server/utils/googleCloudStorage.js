const {Storage} = require('@google-cloud/storage');

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) : null;
const storage = new Storage({ credentials: credentials });


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

        blobStream.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${newFileName}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    })
}

module.exports = uploadImageToStorage;