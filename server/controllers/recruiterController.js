const dotenv = require('dotenv');
dotenv.config();
const { auth, db } = require('../config/firebase');
const { query, setDoc, doc, updateDoc, arrayUnion, getDoc, collection , getDocs} = require('firebase/firestore');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const PDFParser = require('pdf-parse');

// const axios = require('axios');


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
        // console.log('File uploaded successfully!');
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


async function getResumeScore(req, res) {
    try {
        // console.log("GET RESUME SCORE---------------------------");

        const resumeUrl = req.query.downloadUrl;
        const jobId = req.query.jobId;
        console.log(resumeUrl);
        console.log(jobId);

        // Dynamically import fetch
        const { default: fetch } = await import('node-fetch');

        // Fetch the resume PDF from the URL
        const resumeResponse = await fetch(resumeUrl);
        const buffer = await resumeResponse.arrayBuffer();

        // Parse the PDF to extract text
        const data = await PDFParser(buffer);
        const parsedResume = data.text;

        // console.log("Parsed ----------------------", parsedResume);

        // Fetch job details from your local API
        const jobResponse = await fetch(`http://${process.env.REACT_APP_API_URL}:3001/api/jobs/getJobdetails?jobId=${jobId}`);
        const jobData = await jobResponse.json();

        const jobTitle = jobData.jobTitle || "";
        const jobDescription = jobData.jobDescription || "";
        const skills = jobData.skills || "";

        // Access your API key as an environment variable
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const basePrompt = `Resume: ${parsedResume}. Here is the job title: ${jobTitle}, job description: ${jobDescription}, and skills: ${skills} for a particular job.`;
        const prompt = basePrompt + ` Just give me a score out of 100 according to the resume given, matching it with the job title, job description, and the skills needed, and nothing else.`;
        console.log(prompt);

        const result = await model.generateContent(prompt);
        const geminiResponse = await result.response;
        const score = (await geminiResponse.text()).trim();

        console.log(score);
        const educationPrompt = basePrompt + " Just give me a score of education out of 10 based on the requirements for the job role, reputation of the university, placement rate, student's GPA, etc. And just give me a score, no explanation.";
        
        const education = await model.generateContent(educationPrompt);
        const educationGeminiResponse = await education.response;
        const educationScore = (await educationGeminiResponse.text()).trim();

        const educationSuggestionsPrompt = basePrompt + " Just give me comments on the education listed in the resume with less than 25 words.";
        
        const educationSuggestion = await model.generateContent(educationSuggestionsPrompt);
        const educationSuggestionGeminiResponse = await educationSuggestion.response;
        const educationSuggestions = (await educationSuggestionGeminiResponse.text()).trim();

        const experiencePrompt = basePrompt + " Just give me a score of experience out of 10 based on the duration of experience gained, work done during the experience, position of the role, and match the work done with the requirements our role needs. And just give me a score, no explanation, nothing else.";
        
        const experience = await model.generateContent(experiencePrompt);
        const experienceGeminiResponse = await experience.response;
        const experienceScore = (await experienceGeminiResponse.text()).trim();

        const experienceSuggestionsPrompt = basePrompt + " Just give me comments on the experience listed on the resume with less than 25 words.";
        
        const experienceSuggestion = await model.generateContent(experienceSuggestionsPrompt);
        const experienceSuggestionGeminiResponse = await experienceSuggestion.response;
        const experienceSuggestions = (await experienceSuggestionGeminiResponse.text()).trim();
        
        const projectsPrompt = basePrompt + " Just give me a score of projects listed in the resume out of 10 based on the duration of project, work done during the project, technologies used in the project, and match the work done with the requirements of our role. And just give me a score, no explanation, nothing else.";
        
        const projects = await model.generateContent(projectsPrompt);
        const projectsGeminiResponse = await projects.response;
        const projectsScore = (await projectsGeminiResponse.text()).trim();

        const projectsSuggestionsPrompt = basePrompt + " Just give me overall comments on the overall projects listed on the resume with less than 25 words and no bullet points.";
        
        const projectsSuggestion = await model.generateContent(projectsSuggestionsPrompt);
        const projectsSuggestionGeminiResponse = await projectsSuggestion.response;
        const projectsSuggestions = (await projectsSuggestionGeminiResponse.text()).trim();
       

        res.status(200).json({ score, educationScore, educationSuggestions, experienceScore, experienceSuggestions, projectsScore, projectsSuggestions });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred while processing the resume.");
    }
}



module.exports = { createNewRecruiter, uploadNewFile, getFiles, getFileDownloadUrl, getFileViewUrl,getRecruiterList, getResumeScore };
