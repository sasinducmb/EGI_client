import React from 'react';
import { Outlet } from 'react-router-dom';

function GuestLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default GuestLayout;
