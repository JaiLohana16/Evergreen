import React, { useState } from 'react';
import { backendURl } from '../App';
import axios from "axios"
const ReviewForm = ({ productId, onReviewAdded }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(() => {
            setError('');
            setSuccess(''); 
        }, 3000);
        

        if (!name || !review) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // const response = await fetch(backendURl+'/api/product/review/add', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ productId, name, review }),
            // });
            // const data = await response.json();
            const response=await axios.post(backendURl+"/api/product/review/add",{productId, name, review},{})
            const data=response.data
            

            if (data.success) {
                setSuccess('Review added successfully!');
                setName('');
                setReview('');
                onReviewAdded(); // Call the parent function to refresh the reviews
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error adding review. Please try again later.');
        }
    };

    return (
        <div className="mt-6 w-80">
            <h2 className="text-lg font-bold">Add Your Review</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <input type="text"placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2"/>
                <textarea placeholder="Your Review" value={review} onChange={(e) => setReview(e.target.value)} className="border p-2 h-12"/>
                <button type="submit" className="bg-blue-500 text-white py-2 rounded">Submit Review</button>
            </form>
        </div>
    );
};

export default ReviewForm;
