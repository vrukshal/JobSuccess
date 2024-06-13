const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { setDoc, doc, updateDoc, arrayUnion, getDoc } = require('firebase/firestore');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { useDispatch, useSelector } = require('react-redux');
const { admin } = require('../config/firebase-admin');


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
    console.log(req.body);
    const filename = req.body.filename;
    const filetype = req.body.filetype;
    const recruiterUid = req.body.uid;

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
        Key: `files/${filename}`,
        ContentType: filetype,
        Body: file.buffer // Use the file buffer here
    });

    console.log(command);

    try {
        await s3client.send(command);
        const fileUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-2.amazonaws.com/files/${filename}`;
        console.log('File uploaded successfully!');
        const collectionRef = doc(db, "EmployerProfiles", recruiterUid);
        await updateDoc(collectionRef,{
            files: arrayUnion({
               bucketPath: fileUrl,
               uploadedAt: new Date().toISOString()
            })
        }).then(console.log("Updated", fileUrl));
        res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
}

async function getFiles(req,res){
    const recruiterUid = req.query.recruiterUid; 
    console.log(recruiterUid);
    try {
        const collectionRef = doc(db, "EmployerProfiles", recruiterUid);
        await getDoc(collectionRef)
        .then((docSnap) => {
            const files = docSnap.data().files; 
            res.status(200).json(files);
        })
        .catch((error) => {
            res.status(404).json({ message: error.message });
        });
        // console.log(docSnap);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ error: 'Error fetching files.' });
    }
}

module.exports = { createNewRecruiter, uploadNewFile, getFiles };
