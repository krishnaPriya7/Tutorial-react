import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from 'react-redux';

function CreatePost() {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const navigate = useNavigate();
    const user = useSelector(store => store.auth.user);

    function addPost(token) {
        axios.post('https://medicalstore.mashupstack.com/api/medicine', {
            name: name,
            company: company,
            expiry_date: expiryDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            navigate('/blog/posts');
        });
    }
    

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2">
                        <h1 className="text-center">Add Medicine</h1>
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
                        <button className="btn btn-primary float-right" onClick={() => addPost(user.token)}>Submit</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(CreatePost);
