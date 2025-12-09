import App from "../App";
import Error from "../features/Error/Error";
import Login from "../features/Login/Login";

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
        path: "*",
        element: <Error code={404} message="Page not found" />,
      },
    ],
  },
];

export default routes;
