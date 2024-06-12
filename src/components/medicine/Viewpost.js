import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from 'react-redux';

function ViewPost() {
    var {postId} = useParams()
    var [medicine, setMedicine] = useState({ name: '', company: '', expiry_date: '' })
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        axios.get(`https://medicalstore.mashupstack.com/api/medicine/${postId}`, {
    headers: { 'Authorization': `Bearer ${user.token}` }
})
.then(response => {
            setMedicine(response.data)
        })
    }, [postId]);

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header"><h3>{medicine.name}</h3></div>
                            <div className="card-body">
                                <p><strong>Company:</strong> {medicine.company}</p>
                                <p><strong>Expiry Date:</strong> {medicine.expiry_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(ViewPost);
