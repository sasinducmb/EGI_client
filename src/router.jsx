import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Signup from './views/Signup';
import Login from './views/Login';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';

const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <GuestLayout />,
  //   children: [{ path: '/', element: <Home /> }],
  // },
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

export default router;
