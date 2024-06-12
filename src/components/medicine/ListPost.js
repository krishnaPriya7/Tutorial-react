import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import PostListItem from "./PostListItem";
import checkAuth from "../auth/checkAuth";
import { useSelector } from 'react-redux';

function ListPosts() {
  const user = useSelector(store => store.auth.user);
  const [allPosts, setAllPosts] = useState([]); // Store all the fetched posts from the API
  const [filteredPosts, setFilteredPosts] = useState([]); // Store the filtered posts based on search term
  const [SearchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();


  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (SearchTerm.trim() === "") {
      // If the search input is empty, reset the filteredPosts state.
      setFilteredPosts(allPosts);
    } else {
      // Otherwise, filter the posts based on the first letter of the medicine name.
      var filteredItems = allPosts.filter((item) =>
        item.name.toLowerCase().startsWith(SearchTerm.toLowerCase())
      );
      setFilteredPosts(filteredItems);
    }
  };
  
  
  
  function fetchPosts() {
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine',{
      headers: { 'Authorization': `Bearer ${user.token}` }})
      .then((response) => {
        setAllPosts(response.data);
        setFilteredPosts(response.data); // Initialize filteredPosts with all the fetched posts
      });
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Medicine: </label>
              <input
                type="text"
                value={SearchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicine</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/blog/posts/create" className="btn btn-info mb-2">
              Add Medicine
            </Link>
            {filteredPosts.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <PostListItem key={post.id} post={post} refresh={fetchPosts} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default  checkAuth(ListPosts);
