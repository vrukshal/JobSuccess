const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { setDoc, doc } = require('firebase/firestore');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

async function createNewRecruiter(req, res) {
    const recruiterInfo = req.body;
    const uid = req.body.uid;
    await setDoc(doc(db, "EmployerProfiles", uid), recruiterInfo)
        .then(() => {
            res.status(200).send(recruiterInfo);
        })
        .catch((error) => {
            res.status(400).send({ error: error.message });
        });
}

async function uploadNewFile(req, res) {
    const filename = req.body.filename;
    const filetype = req.body.filetype;
    const file = req.file; // Use req.file for the uploaded file
    console.log(process.env.ACCESS_KEY);
    console.log(filename, filetype);

    const s3client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `files/${filename}`,
        ContentType: filetype,
        Body: file.buffer // Use the file buffer here
    });

    console.log(command);

    try {
        await s3client.send(command);
        const fileUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-2.amazonaws.com/files/${filename}`;
        console.log('File uploaded successfully!');
        res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
}

module.exports = { createNewRecruiter, uploadNewFile };
