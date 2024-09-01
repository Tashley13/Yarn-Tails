import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AllPatterns from "../components/AllPatterns";
import UserPatterns from '../components/UserPatterns';
import ViewUserPattern from '../components/ViewUserPattern';
import PatternDetail from '../components/PatternDetail';
import CreatePattern from '../components/CreatePattern';
import EditPattern from '../components/EditPattern';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <AllPatterns />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "patterns/:userId",
        element: <UserPatterns/>
      },
      {
        path: ":patternId/view_pattern",
        element: <ViewUserPattern />
      },
      {
        path: ":patternId/pattern_only",
        element: <PatternDetail />
      },
      {
        path: "pattern/new",
        element: <CreatePattern />
      },
      {
        path: ":patternId/edit",
        element: <EditPattern />
      }
    ],
  },
]);
