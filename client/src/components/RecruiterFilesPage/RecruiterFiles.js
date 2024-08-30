import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import RecruiterNavbar from '../RecruiterNavbar';
import RecruiterSidebar from '../RecruiterSidebar';
import './RecruiterFiles.css';
import Cookies from 'js-cookie';
import { db } from '../../config/firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
function RecruiterFiles() {
    const [file, setFile] = React.useState(null);
    const recruiter = JSON.parse(Cookies.get('recruiter'));
    // const user = useSelector((state) => state.auth.user);
    const [userFiles, setUserFiles] = React.useState([]);

    React.useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/recruiter/files?recruiterUid=${recruiter.uid}`);
                console.log(response);
                setUserFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, []);

    // console.log(user);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFiletoS3 = async () => {
        try {
            const formData = new FormData();
            console.log(recruiter);
            formData.append('filename', file.name);
            formData.append('filetype', file.type);
            formData.append('folderName', "files");
            formData.append('file', file);
            formData.append('uid', recruiter.uid);
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}:3001/api/recruiter/fileupload`, {
                method: 'POST',
                body: formData,
            });
            const uploadFiledata = await response.json()
            const collectionRef = doc(db, "EmployerProfiles", recruiter.uid);

            await updateDoc(collectionRef,{
                files: arrayUnion({
                   bucketPath: uploadFiledata.fileUrl,
                   uploadedAt: new Date().toISOString()
                })
            }).then(console.log("Updated", uploadFiledata.fileUrl));

            const newFile = {
                bucketPath: uploadFiledata.fileUrl,
                uploadedAt: new Date().toISOString()
            };
            setUserFiles([...userFiles, newFile]); // Append the new file to the list
            setFile(null); // Clear the file input
            console.log(uploadFiledata);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleDownload = async (filename) => {
        try {
            const folderName = "files";
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiter.uid}`);
            const { downloadUrl } = response.data;
            window.location.href = downloadUrl; // Trigger the download
        } catch (error) {
            console.error('Error fetching download URL:', error);
        }
    };

    const handleView = async (filename) => {
        try {
            const folderName = "files";
            const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/api/recruiter/get-signed-url?filename=${filename}&folderName=${folderName}&recruiterUid=${recruiter.uid}`);
            const { downloadUrl } = response.data;
            window.open(downloadUrl, '_blank'); // Open the file in a new tab
        } catch (error) {
            console.error('Error fetching view URL:', error);
        }
    };

    return (
        <div className="recruiter-main-page">
            <RecruiterSidebar />
            {/* <div className='recruiter-files-main'> */}
            <div className="main-section">
                <RecruiterNavbar />
                <div className="main-container-to-fit-in-centre">
                    <div className='recruiter-files-content'>
                        <div className='upload-file'>
                            <input type='file' className="form-control" onChange={handleFileChange} />
                            <button onClick={uploadFiletoS3} disabled={!file}>Upload</button>
                        </div>
                        <div className="table-content">
                            <h2>Files</h2>
                            <table id="myTable" className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>File</th>
                                        <th>Filename</th>
                                        <th>Uploaded At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userFiles && userFiles.map((file, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button onClick={() => handleView(file.bucketPath.split('/').pop())}>
                                                    View
                                                </button>
                                            </td>
                                            <td>{file.bucketPath.split('/').pop()}</td>
                                            <td>{new Date(file.uploadedAt).toLocaleString()}</td>
                                            <td>
                                                <button onClick={() => handleDownload(file.bucketPath.split('/').pop())}>
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default RecruiterFiles;
