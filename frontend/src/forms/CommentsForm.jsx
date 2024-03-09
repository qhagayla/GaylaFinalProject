import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsForm = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, [videoId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/v1/videos/${videoId}/comments/`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleAddComment = async () => {
        try {
            await axios.post(`/api/v1/videos/${videoId}/comments/`, { text: newComment });
            setNewComment('');
            fetchComments(); // Refresh comments after adding a new one
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`/api/v1/videos/${videoId}/comments/${commentId}/`);
            fetchComments(); // Refresh comments after deleting one
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEditComment = async (commentId, newText) => {
        try {
            await axios.put(`/api/v1/videos/${videoId}/comments/${commentId}/`, { text: newText });
            fetchComments(); // Refresh comments after editing one
        } catch (error) {
            console.error('Error editing comment:', error);
        }
    };

    return (
        <div className="comments-form">
            <h3>Comments:</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        <span>{comment.user}: {comment.text}</span>
                        <button onClick={() => handleEditComment(comment.id, 'Updated text')}>Edit</button>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Send</button>
        </div>
    );
};

export default CommentsForm;
