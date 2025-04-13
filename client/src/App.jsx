import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Landing,
  Register,
  Login,
  Movies,
  NewMovie,
  SitSelector,
  PaymentsSuccess,
  NotFound,
  MovieDetails,
  DashboardPage,
} from "./Pages";
import "@fontsource/poppins";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Movies",
    element: <Movies />,
  },
  {
    path: "/movie/:title",
    element: <MovieDetails />,
  },
  {
    path: "/NewMovie",
    element: <NewMovie />,
  },
  {
    path: "/SitSelector/:screeningId",
    element: <SitSelector />,
  },
  {
    path: "/payments/success",
    element: <PaymentsSuccess />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
