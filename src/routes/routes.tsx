import App from "../App";
import Error from "../features/Error/Error";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import Profile from "../features/Profile/Profile";
import UpdateUsername from "../features/Profile/UpdateUsername";
import UpdatePassword from "../features/Profile/UpdatePassword";
import AllPosts from "../features/AllPosts/AllPosts";
import MyPosts from "../features/MyPosts/MyPosts";
import CreatePost from "../features/CreatePost/CreatePost";
import EditPost from "../features/EditPost/EditPost";
import RequireAuth from "../components/RouteWrappers/RequireAuth";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AllPosts />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
      {
        path: "/username",
        element: (
          <RequireAuth>
            <UpdateUsername />
          </RequireAuth>
        ),
      },
      {
        path: "/password",
        element: (
          <RequireAuth>
            <UpdatePassword />
          </RequireAuth>
        ),
      },
      {
        path: "/my",
        element: (
          <RequireAuth>
            <MyPosts />
          </RequireAuth>
        ),
      },
      {
        path: "/create",
        element: (
          <RequireAuth>
            <CreatePost />
          </RequireAuth>
        ),
      },
      {
        path: "/posts/:postId/edit",
        element: (
          <RequireAuth>
            <EditPost />
          </RequireAuth>
        ),
      },
      {
        path: "*",
        element: <Error code={404} message="Page not found" />,
      },
    ],
  },
];

export default routes;
