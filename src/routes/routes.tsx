import App from "../App";
import Error from "../features/Error/Error";
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import Profile from "../features/Profile/Profile";
import RequireAuth from "../components/RouteWrappers/RequireAuth";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
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
        path: "*",
        element: <Error code={404} message="Page not found" />,
      },
    ],
  },
];

export default routes;
