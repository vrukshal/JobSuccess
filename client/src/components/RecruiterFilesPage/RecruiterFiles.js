import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
function RecruiterFiles() {
    const [file, setFile] = React.useState(null);
    const recruiter = useSelector((state) => state.recruiter.data);
    const user = useSelector((state) => state.auth.user);
    const [userFiles, setUserFiles] = React.useState([]);
    React.useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/recruiter/files?recruiterUid=${user.uid}`);
                console.log(response);
                setUserFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);


    console.log(user);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFiletoS3 = async () => {
        try {
            const formData = new FormData();
            console.log(recruiter);
            formData.append('filename', file.name);
            formData.append('filetype', file.type);
            formData.append('file', file);
            formData.append('uid', user.uid);
            const response = await fetch('http://localhost:3001/api/recruiter/fileupload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div>
            <input type='file' onChange={handleFileChange} />
            <button onClick={uploadFiletoS3}>Submit</button>

            <div>
            <h2>Files</h2>
            <table>
                <thead>
                    <tr>
                        <th>File</th>
                        <th>Filename</th>
                        <th>Uploaded At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userFiles.map((file, index) => (
                        <tr key={index}>
                            <td>
                                <a href={file.bucketPath} target="_blank" rel="noopener noreferrer">
                                    View
                                </a>
                            </td>
                            <td>{file.bucketPath.split('/').pop()}</td>
                            <td>{new Date(file.uploadedAt).toLocaleString()}</td>
                            <td>
                                <a href={file.bucketPath} download>
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        
    );
}

export default RecruiterFiles;
