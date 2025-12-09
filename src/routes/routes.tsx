import App from "../App";
import Error from "../features/Error/Error";

const routes = [
  {
    path: "/",
    elements: <App />,
    children: [
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default routes;
