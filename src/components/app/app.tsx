import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from '@/components/private-route/private-route';
import SignIn from '@/pages/sign-in/sign-in';
import Tasks from '@/pages/tasks/tasks';
import Landing from '@/pages/landing/landing';
import './app.css';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/tasks" element={<PrivateRoute Component={Tasks} />} />
    </Routes>
  );
};

export default App;
