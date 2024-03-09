// UploadForm.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadVideo } from '../features/videos/videoSlice';
import axios from 'axios';

const UploadForm = ({ onClose }) => {
    const [caption, setCaption] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('video', selectedFile);

        try {
            // Dispatch the uploadVideo action with the form data
            dispatch(uploadVideo(formData));
            // Close the form after successful upload
            onClose();
        } catch (error) {
            setError('Failed to upload video');
        }
    };

    return (
        <div className="upload-form-container">
            <div className="upload-form">
                <button className="exit-button" onClick={onClose}>X</button>
                <h2>Upload Video</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Caption" value={caption} onChange={handleCaptionChange} required />
                    <input type="file" onChange={handleFileChange} required />
                    <button type="submit">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default UploadForm;
