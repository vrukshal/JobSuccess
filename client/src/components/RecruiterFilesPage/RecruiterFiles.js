import React from 'react';

function RecruiterFiles() {
    const [file, setFile] = React.useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFiletoS3 = async () => {
        try {
            const formData = new FormData();
            formData.append('filename', file.name);
            formData.append('filetype', file.type);
            formData.append('file', file);

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
        </div>
    );
}

export default RecruiterFiles;
