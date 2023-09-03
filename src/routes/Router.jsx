import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Banner from "../pages/Banner";
import MyPost from "../pages/MyPost";
import AddPost from "../pages/AddPost";
import Login from "../authentication/Login";
import SignUp from "../authentication/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "my-post",
        element: <MyPost />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
    ],
  },
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/sign-up",
    element: <SignUp />,
  },
]);
export default router;
