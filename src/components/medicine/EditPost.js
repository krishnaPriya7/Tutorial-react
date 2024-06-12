import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from 'react-redux';

function EditPost() {
    const { postId } = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then(response => {
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiryDate(response.data.expiry_date);
        })
        .catch(error => {
            console.error('Error fetching medicine:', error);
            // Handle error (e.g., show error message to user)
        });
    }, [postId, user.token]);

    function updatePost() {
        axios.post(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
            name: name,
            company: company,
            expiry_date: expiryDate
        }, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        })
        .then(response => {
            alert(response.data.message);
            navigate('/blog/posts');
        })
        .catch(error => {
            console.error('Error updating medicine:', error);
            // Handle error (e.g., show error message to user)
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Edit Medicine</h1>
                        <div className="form-group">
                            <label>Name:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(event) => { setName(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Company:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={company} 
                                onChange={(event) => { setCompany(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                            <label>Expiry Date:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={expiryDate} 
                                onChange={(event) => { setExpiryDate(event.target.value) }}
                            />
                        </div>
                        <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updatePost}>Submit</button>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(EditPost);
