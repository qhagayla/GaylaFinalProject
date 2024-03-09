import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteVideo } from '../features/videos/videoSlice';

const DeleteForm = ({ videoId, onClose }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteVideo(videoId)); // Dispatch the deleteVideo action with video id
        onClose(); // Close the delete confirmation form
    };

    const handleCancel = () => {
        onClose(); // Close the delete confirmation form
    };

    return (
        <div className="delete-form-container">
            <div className="delete-form">
                <p>Do you want to delete the video?</p>
                <div className="delete-form-buttons">
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteForm;
