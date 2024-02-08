import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
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
    ],
  },
]);

export default router;
