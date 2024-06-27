const dotenv = require('dotenv');
dotenv.config();
const {auth, db} = require('../config/firebase');
const { setDoc, doc } = require('firebase/firestore');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

async function createNewApplicant(req,res){
    const applicantInfo = req.body;
    const uid = req.body.uid;
    await setDoc(doc(db, "StudentProfiles", uid), applicantInfo)
    .then(() => {
        // res.status(200).send(body)
        res.status(200).send(applicantInfo);
    })
    .catch((error) => {
        res.status(400).send({ error: error.message });
    });
}


async function uploadNewFile(req, res) {
    console.log(req.body);
    const filename = req.body.filename;
    const filetype = req.body.filetype;
    const folderName = req.body.folderName;
    const studentUid = req.body.uid;

    const file = req.file; // Use req.file for the uploaded file

    const s3client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${studentUid}/${folderName}/${filename}`,
        ContentType: filetype,
        Body: file.buffer // Use the file buffer here
    });

    console.log(command);

    try {
        await s3client.send(command);
        const fileUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-2.amazonaws.com/${studentUid}/${folderName}/${filename}`;
        console.log('File uploaded successfully!');
        res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
}


async function getFileDownloadUrl(req, res) {
    const { filename, folderName, studentUid } = req.query;
     // Get the filename from the query parameters
    console.log(filename, folderName, studentUid);

    const s3client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${studentUid}/${folderName}/${filename}`
    });

    try {
        const downloadUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 }); // URL valid for 1 hour
        console.log('Generated download URL:', downloadUrl);
        res.status(200).json({ downloadUrl });
    } catch (error) {
        console.error('Error generating download URL:', error);
        res.status(500).json({ error: 'Error generating download URL.' });
    }
}
module.exports = {createNewApplicant, uploadNewFile, getFileDownloadUrl};