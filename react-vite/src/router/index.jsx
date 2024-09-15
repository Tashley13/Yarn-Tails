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
import AllTests from '../components/AllTests/AllTests';
import UserTests from '../components/UserTests/UserTests';
import PatternTests from '../components/PatternTests';
import TestDetails from '../components/TestDetails/TestDetails';
import CreateTest from '../components/CreateTest/CreateTest';
// import AddPatternImages from '../components/PatternImages';
// import CreateTest from '../components/CreateTest/CreateTest';
import UpdateTest from '../components/UpdateTest';
// import ImagesbyPattern from '../components/PatternImages/GetPatternImages';

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
      },
      {
        path: "tests",
        element: <AllTests />
      },
      {
        path: "tests/:userId",
        element: <UserTests />
      },
      {
        path: ":patternId/tests",
        element: <PatternTests />
      },
      {
        path: "/test/:testerId",
        element: <TestDetails />
      },
      {
        path: '/:patternId/test/new',
        element: <CreateTest />
      },
      // {
      //   path: '/pimages/:patternId/newImages',
      //   element: <AddPatternImages/>
      // },
      // {
      //   path: `/pimages/:patternId/images`,
      //   element: <ImagesbyPattern/>
      // },
      {
        path: '/test/:testerId/edit',
        element: <UpdateTest />
      }
    ],
  },
]);
