import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Templates from "./components/Templates";
import Projects from "./components/Projects";
import CreateDesign from "./components/CreateDesign";
import Main from "./pages/Main";
import { token_decode } from "./utils/index";
const userInfo = token_decode(localStorage.getItem("canva_token"));

const router = createBrowserRouter([
  {
    path: "/",
    element: userInfo ? <Layout /> : <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/templates",
        element: <Templates />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
  {
    path: "/design/create",
    element: <CreateDesign />,
  },
  {
    path: "/design/:id/edit",
    element: <Main />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
