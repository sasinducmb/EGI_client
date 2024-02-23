import { createBrowserRouter } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import Signup from './views/Signup';
import Login from './views/Login';
import Account from './views/Account';
import Contact from './views/Contact';
import DefaultLayout from './components/DefaultLayout';
import GuestLayout from './components/GuestLayout';
import Wishlist from './views/Wishlist';

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
      { path: '/account', element: <Account /> },
      { path: '/contact', element: <Contact /> },
      { path: '/wishlist', element: <Wishlist /> },
    ],
  },
]);

export default router;
