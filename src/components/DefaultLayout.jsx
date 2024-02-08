import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

function DefaultLayout() {
  return (
    <>
      <Header />
      <Navbar />
      <hr />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
