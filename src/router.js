import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ListPosts from "./components/medicine/ListPost";
import CreatePost from "./components/medicine/CreatePost";
import ViewPost from "./components/medicine/Viewpost";
import EditPost from "./components/medicine/EditPost";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'blog/posts', element:<ListPosts/>},
    { path : 'blog/posts/create' , element : <CreatePost/>},
    { path: 'blog/posts/:postId', element: <ViewPost/>},
    { path : '/blog/posts/:postId/edit', element: <EditPost/>},
    { path: 'register', element:<Register/>},
    { path: 'login', element:<Login/>},
]);

export default router;