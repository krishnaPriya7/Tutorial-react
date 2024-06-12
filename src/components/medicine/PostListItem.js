import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function PostListItem(props) {
    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.auth.user);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const deletePost = () => {
        axios
            .delete(`https://medicalstore.mashupstack.com/api/medicine/${props.post.id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            .then((response) => {
                alert(response.data.message);
                props.refresh();
                toggleModal(); // Close the modal after successful deletion
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
                // Handle error appropriately (e.g., show error message)
            });
    };

    return (
        <div className="card">
            <div className="card-body">
                {props.post.name}
                <button className="btn btn-primary float-right ml-1" onClick={toggleModal}>Delete</button>
                <Link to={`/blog/posts/${props.post.id}/edit`} className="btn btn-primary float-right ml-1">Edit</Link>
                <Link to={`/blog/posts/${props.post.id}`} className="btn btn-primary float-right ml-1">View</Link>

                {/* Modal */}
                {showModal && (
                    <div className="modal" style={{ display: "block" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Deletion</h5>
                                    <button type="button" className="close" onClick={toggleModal}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this post?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                    <button type="button" className="btn btn-danger" onClick={deletePost}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostListItem;