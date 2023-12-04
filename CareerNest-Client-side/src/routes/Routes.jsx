import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/shared/ErrorPage";
import Login from "../pages/UserAuth.jsx/Login";
import Register from "../pages/UserAuth.jsx/Register";
import Blogs from "../pages/blogs/Blogs";
import AllJobs from "../pages/jobs/AllJobs";
import AddJob from "../pages/jobs/AddJob";
import AppliedJobs from "../pages/jobs/AppliedJobs";
import MyJobs from "../pages/jobs/MyJobs";
import PrivateRoute from "./PrivateRoutes";
import SingleJob from "../pages/jobs/SingleJob";
import UpdateJob from "../pages/jobs/UpdateJob";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement : <ErrorPage></ErrorPage>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/blogs',
            element: <Blogs></Blogs>
        },
        {
            path: '/allJobs',
            element: <AllJobs></AllJobs>
        },
        {
            path: '/addJob',
            element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
        },
        {
            path: '/appliedJob',
            element: <PrivateRoute><AppliedJobs></AppliedJobs></PrivateRoute>
        },
        {
            path: '/myJob',
            element: <PrivateRoute><MyJobs></MyJobs></PrivateRoute>
        },
        {
            path: '/singleJob/:id',
            element: <PrivateRoute><SingleJob></SingleJob></PrivateRoute>
        },
        {
            path: '/updateJob/:id',
            element: <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>
        }
      ]
    },
  ]);
export default router;
