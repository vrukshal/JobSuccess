const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { query, setDoc, doc, updateDoc, arrayUnion, getDoc, collection , getDocs} = require('firebase/firestore');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
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
    // console.log(req.body);
    const filename = req.body.filename;
    const filetype = req.body.filetype;
    const folderName = req.body.folderName;
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
        Key: `${recruiterUid}/${folderName}/${filename}`,
        ContentType: filetype,
        Body: file.buffer // Use the file buffer here
    });

    // console.log(command);

    try {
        await s3client.send(command);
        const fileUrl = `https://${process.env.BUCKET_NAME}.s3.us-east-2.amazonaws.com/${recruiterUid}/${folderName}/${filename}`;
        console.log('File uploaded successfully!');
        const collectionRef = doc(db, "EmployerProfiles", recruiterUid);
        if(folderName === "logo"){
            res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
        }
        else{
            await updateDoc(collectionRef,{
            files: arrayUnion({
               bucketPath: fileUrl,
               uploadedAt: new Date().toISOString()
            })
        }).then(console.log("Updated", fileUrl));
        res.status(200).json({ message: 'File uploaded successfully!', fileUrl });
    }
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Error uploading file.' });
    }
}

async function getFiles(req,res){
    const recruiterUid = req.query.recruiterUid; 
    // console.log(recruiterUid);
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

async function getFileDownloadUrl(req, res) {
    const { filename, folderName, recruiterUid } = req.query;
     // Get the filename from the query parameters
    // console.log(filename, folderName, recruiterUid);

    const s3client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${recruiterUid}/${folderName}/${filename}`
    });

    try {
        const downloadUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 }); // URL valid for 1 hour
        // console.log('Generated download URL:', downloadUrl);
        res.status(200).json({ downloadUrl });
    } catch (error) {
        console.error('Error generating download URL:', error);
        res.status(500).json({ error: 'Error generating download URL.' });
    }
}

async function getFileViewUrl(req, res) {
    const { filename, folderName } = req.query; // Get the filename from the query parameters
    // console.log(filename);

    const s3client = new S3Client({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        }
    });

    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `${folderName}/${filename}`
    });

    try {
        const viewUrl = await getSignedUrl(s3client, command, { expiresIn: 3600 }); // URL valid for 1 hour
        // console.log('Generated view URL:', viewUrl);
        res.status(200).json({ viewUrl });
    } catch (error) {
        console.error('Error generating view URL:', error);
        res.status(500).json({ error: 'Error generating view URL.' });
    }
}



async function getRecruiterList(req,res){
    try {
        const q = query(collection(db, "EmployerProfiles"));

        const querySnapshot = await getDocs(q);
        const RecruiterList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.status(200).json(RecruiterList);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving notifications ");
    }
}


module.exports = { createNewRecruiter, uploadNewFile, getFiles, getFileDownloadUrl, getFileViewUrl,getRecruiterList };
