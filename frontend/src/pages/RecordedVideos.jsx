import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideos, deleteVideo } from '../features/videos/videoSlice';
import UploadForm from '../forms/UploadForm';
import DeleteForm from '../forms/DeleteForm';

const RecordedVideos = () => {
    const dispatch = useDispatch();
    const { videos, isLoading, isError } = useSelector((state) => state.video);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [videoToDelete, setVideoToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchVideos());
    }, [dispatch]);

    const toggleUploadForm = () => {
        setShowUploadForm(!showUploadForm);
    };

    const toggleDeleteForm = (videoId) => {
        setVideoToDelete(videoId);
        setShowDeleteForm(!showDeleteForm);
    };

    const handleCancel = () => {
        setShowDeleteForm(false);
    };

    return (
        <div>
            <h1>Video List</h1>
            <div style={{ position: 'relative' }}>
                <button className="upload-button" onClick={toggleUploadForm}>Upload</button>
                {showUploadForm && <UploadForm onClose={toggleUploadForm} />}
            </div>
            {isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error loading videos</p>
            ) : videos.length === 0 ? (
                <p>No videos available</p>
            ) : (
                <div className="video-list">
                    {videos.map((video) => (
                        <div className="video-list-item" key={video.id}>
                            <video src={video.video} controls />
                            <p>{video.caption}</p>
                            <button onClick={() => toggleDeleteForm(video.id)}>Delete</button>
                            {showDeleteForm && videoToDelete === video.id && (
                                <DeleteForm
                                    videoId={videoToDelete}
                                    onClose={handleCancel}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecordedVideos;