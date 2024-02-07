import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

const CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

const UploadPdfToDrive = () => {
    const handleFileUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('File uploaded successfully:', response.data);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    const handleLoginSuccess = (response) => {
        localStorage.setItem('accessToken', response.accessToken);
    };

    const handleLoginFailure = (error) => {
        console.error('Error authenticating:', error);
    };

    return (
        <div>
            <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
            />

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />
        </div>
    );
};

export default UploadPdfToDrive;
